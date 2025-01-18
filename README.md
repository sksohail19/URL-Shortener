# URL Shortener Project

This repository contains the source code for a URL Shortener application built using Node.js. Additionally, it includes DevOps configurations for deploying the application using Ansible, Terraform, Docker, Kubernetes, and Jenkins.

## Features
- Shorten URLs for easy sharing.
- Scalable and deployable on cloud infrastructure.
- Uses modern DevOps tools for CI/CD pipeline and containerized deployments.

## Directory Structure
```
URL-Shortener/
├── .gitignore                 # Git ignore file
├── .vscode/                   # VS Code settings
│   └── settings.json
├── ansible/                   # Ansible configuration
│   ├── playbook.yml           # Ansible playbook for deployment
│   └── roles/                 # Ansible roles (if used)
├── Jenkinsfile                # Jenkins pipeline script
├── K8S/                       # Kubernetes manifests
│   ├── deployment.yml         # Kubernetes deployment
│   └── service.yml            # Kubernetes service
├── README.md                  # Project documentation
├── Terraform/                 # Terraform configuration
│   ├── main.tf                # Main Terraform configuration
│   └── variables.tf           # Terraform variables
├── src/                       # Application source code
│   ├── context.js             # Context file
│   ├── controllers/           # Controller files
│   │   └── url.js
│   ├── Dockerfile             # Docker configuration
│   ├── index.js               # Main application file
│   ├── models/                # Model files
│   │   └── url.js
│   ├── package.json           # Node.js dependencies
│   ├── routes/                # Route handlers
│   │   ├── staticroutes.js
│   │   └── url.js
│   └── views/                 # View templates
│       └── home.ejs
```

## Prerequisites
To deploy the project, ensure the following tools are installed:

- Node.js and npm
- Docker
- Kubernetes (kubectl)
- Terraform
- Jenkins

## DevOps Configurations
### 1. Ansible
An Ansible playbook is provided to automate the deployment of the application. It:
- Installs required packages (Node.js, npm, Docker).
- Clones the Git repository.
- Installs Node.js dependencies.
- Builds and runs the application using Docker.

### 2. Terraform
Terraform scripts provision AWS infrastructure:
- A t2.micro EC2 instance is created.
- The instance is pre-configured with Docker, Node.js, and npm to deploy the application.

### 3. Docker
The `Dockerfile` is used to:
- Create a lightweight image for the application.
- Expose port `8080` for the service.

### 4. Kubernetes
Kubernetes manifests include:
- A `Deployment` with 2 replicas for scalability.
- A `Service` of type LoadBalancer to expose the application.

### 5. Jenkins Pipeline
The Jenkins pipeline automates:
- Cloning the repository.
- Installing dependencies.
- Building and pushing the Docker image to Docker Hub.
- Deploying the application to Kubernetes.

## Deployment Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/sksohail19/URL-Shortener.git
   cd URL-Shortener
   ```

2. Run the Ansible playbook:
   ```bash
   ansible-playbook -i inventory ansible-playbook.yml
   ```

3. Use Terraform to provision infrastructure:
   ```bash
   terraform init
   terraform apply
   ```

4. Build and run the Docker container:
   ```bash
   docker build -t url-shortener:latest .
   docker run -p 8080:8080 url-shortener:latest
   ```

5. Deploy to Kubernetes:
   ```bash
   kubectl apply -f k8s-deployment.yaml
   ```

6. Set up the Jenkins pipeline using the provided Jenkinsfile.

## Contributing
Feel free to submit issues or pull requests to improve the project.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
