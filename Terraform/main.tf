provider "aws" {
    region = "us-east-1"
}

resource "aws_instance" "url_shortener_instance" {
    ami = "ami-0c02fb55956c7d316"
    instance_type = "t2.micro"

    provisioner "remote-exec" {
        inline = [
            "sudo apt update",
            "sudo apt install",
            "git clone https://github.com/sksohail19/URL-Shortener.git /opt/url-shortener",
            "cd /opt/URL_Shortener && npm install",
            "sudo docker build -t url-shortner:latest /opt/URL_Shortener",
            "sudo docker run -d -p 3000:3000 url-shortner:latest"
        ]
    }
}

