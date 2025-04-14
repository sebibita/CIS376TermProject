# main.py
import sys
from PyQt6.QtWidgets import QApplication, QMainWindow, QWidget, QVBoxLayout, QLabel, QLineEdit, QPushButton, QHBoxLayout
from PyQt6.QtCore import Qt

class AgentUI(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Agent Configuration UI")
        self.setFixedSize(400, 250)

        # Central layout
        central_widget = QWidget()
        layout = QVBoxLayout()

        # Title
        title = QLabel("Agent Configuration")
        title.setAlignment(Qt.AlignmentFlag.AlignCenter)
        title.setStyleSheet("font-size: 18px; font-weight: bold;")
        layout.addWidget(title)

        # Server address input
        self.server_input = QLineEdit()
        self.server_input.setPlaceholderText("Enter Server Address (e.g. 192.168.1.100)")
        layout.addWidget(self.server_input)

        # Connection status
        self.status_label = QLabel("Status: Disconnected")
        layout.addWidget(self.status_label)

        # Buttons
        button_layout = QHBoxLayout()
        connect_button = QPushButton("Connect")
        connect_button.clicked.connect(self.connect_to_server)
        button_layout.addWidget(connect_button)

        save_button = QPushButton("Save Config")
        save_button.clicked.connect(self.save_config)
        button_layout.addWidget(save_button)

        layout.addLayout(button_layout)

        # Set layout
        central_widget.setLayout(layout)
        self.setCentralWidget(central_widget)

    def connect_to_server(self):
        # Dummy implementation of connection status
        server = self.server_input.text()
        if server.strip():
            self.status_label.setText(f"Status: Connected to {server}")
        else:
            self.status_label.setText("Status: Invalid address")

    def save_config(self):
        server = self.server_input.text()
        if server.strip():
            with open("agent_config.txt", "w") as f:
                f.write(f"server_address={server}\n")
            self.status_label.setText("Config saved.")
        else:
            self.status_label.setText("Error: Enter a valid server address")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = AgentUI()
    window.show()
    sys.exit(app.exec())
