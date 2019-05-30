pipeline {
    agent {
        docker {
            image 'node:8.16.0-alpine'
            args '-p 3000:3000 -p 5000:5000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deliver for development') {
            when {
                branch 'development'
            }
            steps {
                sh 'npm build'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh 'echo \'finish development\''
            }
        }
        stage('Deploy for production') {
            when {
                branch 'master'
            }
            steps {
                sh 'npm build'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh 'echo \'finish production\''
            }
        }
    }
}
