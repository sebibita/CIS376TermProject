BPF_CLANG=clang
BPF_CFLAGS=-g -O2 -target bpf
GCC=gcc
CFLAGS=-g -O2

all: monitoringAgent

monitoringAgent.skel.h: monitoringAgent.bpf.o
	bpftool gen skeleton $< > $@

monitoringAgent.bpf.o: monitoringAgent.bpf.c vmlinux.h common_data.h
	$(BPF_CLANG) $(BPF_CFLAGS) -c $< -o $@

monitoringAgent: monitoringAgent.c monitoringAgent.skel.h common_data.h
	$(GCC) $(CFLAGS) -o $@ monitoringAgent.c cJSON.c -lbpf -lelf -lz -lcurl

vmlinux.h:
	bpftool btf dump file /sys/kernel/btf/vmlinux format c > vmlinux.h

clean:
	rm -f monitoringAgent monitoringAgent.bpf.o monitoringAgent.skel.h vmlinux.h

.PHONY: clean all



