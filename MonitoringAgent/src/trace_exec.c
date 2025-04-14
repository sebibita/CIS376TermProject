// eBPF loader program
// loads the eBPF skeleton 
// and attaches the eBPF program to the correct tracepoint
//
//

#include <stdio.h>
#include <unistd.h>
#include <signal.h>
#include "trace_exec.skel.h"
#include "common_data.h"

static volatile sig_atomic_t exit_flag = 0;

static void handle_sigint(int sig) {
    exit_flag = 1;
}

// print data to stdout
// called by ringbuffer
static int handle_event(void *ctx, void *data, size_t len) {
    struct event *e = data;
    printf("PID %d called ", e->pid);
	if(e->call == EXECVE){
		printf("EXECVE\n");
	}
	else if(e->call == OPENAT){
		printf("OPENAT\n");
	}
	printf("  PPID: %d\n", e->ppid);
    printf("  filename: %s\n", e->filename);
    for (int i = 0; i < e->argc; i++) {
        printf("  argv[%d]: %s\n", i, e->argv[i]);
    }
    return 0;
}

int main() {
    struct trace_exec_bpf *skel;
    struct ring_buffer *rb = NULL;
    int err;

    signal(SIGINT, handle_sigint);
    signal(SIGTERM, handle_sigint);

    skel = trace_exec_bpf__open_and_load();
    if (!skel) {
        fprintf(stderr, "Failed to open/load BPF skeleton\n");
        return 1;
    }

    err = trace_exec_bpf__attach(skel);
    if (err) {
        fprintf(stderr, "Failed to attach BPF program\n");
        trace_exec_bpf__destroy(skel);
        return 1;
    }

    rb = ring_buffer__new(bpf_map__fd(skel->maps.rb), handle_event, NULL, NULL);
    if (!rb) {
        fprintf(stderr, "Failed to create ring buffer\n");
        trace_exec_bpf__destroy(skel);
        return 1;
    }

    printf("Tracing execve() calls. Ctrl+C to exit.\n");
    while (!exit_flag) {
        err = ring_buffer__poll(rb, 100);
        if (err == -EINTR) break;
        if (err < 0) {
            fprintf(stderr, "Ring buffer poll error: %d\n", err);
            break;
        }
    }

    ring_buffer__free(rb);

    trace_exec_bpf__destroy(skel);
    return 0;
}

