pipeline {
    agent any

    stages {
        stage ('Clone Repository') {
            steps {
                git 'https://github.com/sksohail19/URL-Shortener.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t url-shortener:latest .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url:'']) {
                    sh 'docker tag url-shortener:latest shaiksohail0726@gmail.com/url-shortener:latest'
                    sh 'docker push shaiksohail0726@gmail.com/url-shortener:latest'

                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f ./k8s/deployment.yaml'
                sh 'kubectl apply -f ./k8s/service.yaml'
            }
        }
    }
}