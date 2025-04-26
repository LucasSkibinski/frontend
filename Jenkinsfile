pipeline {
    agent any
    environment {
        PATH = "C:/Program Files/nodejs/;${env.PATH}"
    }
    stages {
        stage('checkout') {
            steps {
                checkout scm
            }
        }
        stage('install') {
            steps {
                bat 'npm install'
            }
        }
        stage('build') {
            steps {
                bat 'npm run build'
            }
        }
        stage('test') {
            steps {
                bat 'npm run test'
            }
        }
        stage('build image') {
            steps {
                bat 'docker build -t frontend-m1:1.0 .'
            }
        }
        stage('docker push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker_cred', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                    bat 'docker login -u %DOCKERHUB_USERNAME% -p %DOCKERHUB_PASSWORD%'
                    bat 'docker tag frontend-m1:1.0 lucasunc/frontend-m1:1.0'
                    bat 'docker push lucasunc/frontend-m1:1.0'
                    bat 'docker logout'
                }
            }
        }
    }
}