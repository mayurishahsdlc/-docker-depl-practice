pipeline {
    agent any

    stages {

        stage('Docker Check') {
            steps {
                sh 'docker --version'
                sh 'docker-compose --version'
            }
        }

        stage('Create Environment') {
            steps {
                withCredentials([
                    string(credentialsId: 'PORT', variable: 'PORT'),
                    string(credentialsId: 'APP_NAME', variable: 'APP_NAME')
                ]) {
                    sh '''
                        cat > .env <<EOF
PORT=$PORT
APP_NAME=$APP_NAME
EOF

                        echo ".env created"
                    '''
                }
            }
        }

        stage('Build') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker-compose down
                    docker-compose up -d
                '''
            }
        }

        stage('Status') {
            steps {
                sh 'docker-compose ps'
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    for i in {1..12}
                    do
                        if curl -f http://localhost:4000/health
                        then
                            echo "Backend is healthy"
                            exit 0
                        fi

                        echo "Waiting for backend..."
                        sleep 5
                    done

                    echo "Backend health check failed"
                    exit 1
                '''
            }
        }
    }

    post {
        always {
            sh 'rm -f .env'
        }
    }
}
