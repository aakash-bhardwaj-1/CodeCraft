pipeline {

environment {
        DOCKERHUB_CREDENTIALS = credentials('DockerHubCred')
        DOCKERHUB_USER = 'aakashbhardwaj1'
    }

    agent any
    stages {

         stage('Clone repository') {
            steps {
                git branch: 'main', url: 'https://github.com/aakash-bhardwaj-1/CodeCraft.git'
            }
        }


        stage('Maven Build ServiceRegistry') {
            steps {
                echo 'Building ServiceRegistry'
                sh 'cd ServiceRegistry && mvn clean install'
                sh 'mv -f ServiceRegistry/target/ServiceRegistry-0.0.1-SNAPSHOT.jar JarFiles/'
            }
        }


        stage('Maven Build APIGateway') {
            steps {
                echo 'Building APIGateway'
                sh 'cd APIGateway && mvn clean install'
                sh 'mv -f APIGateway/target/APIGateway-0.0.1-SNAPSHOT.jar JarFiles/'
            }
        }


        stage('Maven Build Services') {
            parallel {


                stage('Candidate Service') {
                    steps {
                        script{
                        echo 'Building Candidate Service'
                            mvnHome = tool "mvn"
                        //username and password are provided for integration testing of server with mysql otherwise, no requirement
                        sh "cd CandidateMicroservice && ${mvnHome}/bin/mvn clean package"
                        sh 'mv -f CandidateMicroservice/target/CandidateMicroservice-0.0.1-SNAPSHOT.jar JarFiles/'
                    }
                    }
                }


                stage('Interviewer Service') {
                    steps {
                        echo 'Building Interviewer Service'
                        //username and password are provided for integration testing of server with mysql otherwise, no requirement
                        sh "cd InterviewerMicroservice && mvn clean install"
                        sh 'mv -f InterviewerMicroservice/target/InterviewerMicroservice-0.0.1-SNAPSHOT.jar JarFiles/'
                    }
                }


            }


        }
    
            stage('Build Docker Images') {
            steps {
                echo 'Building Docker Images'
                sh "docker build -t ${DOCKERHUB_USER}/eurekaregistry -f Dockerfiles/ServiceRegistryDockerfile ."
                sh "docker build -t ${DOCKERHUB_USER}/apigateway -f Dockerfiles/APIGatewayServiceDockerfile ."
                sh "docker build -t ${DOCKERHUB_USER}/interviewerservice -f Dockerfiles/InterviewerServiceDockerfile ."
                sh "docker build -t ${DOCKERHUB_USER}/candidateservice -f Dockerfiles/CandidateServiceDockerfile ."
                // sh "docker build -t ${DOCKERHUB_USER}/accountservice -f Dockerfiles/AccountServiceDockerfile ."
                // sh "docker build -t ${DOCKERHUB_USER}/notificationservice -f Dockerfiles/NotificationServiceDockerfile ."
                // sh "docker build -t ${DOCKERHUB_USER}/frontend -f Dockerfiles/FrontendDockerfile ."
            }
        }
            
            stage('Login to Docker Hub') {
            steps {
                echo 'Login to Docker Hub'
                withCredentials([usernamePassword(credentialsId: 'DockerHubCred', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
                    sh "docker login -u ${DOCKERHUB_USER} -p ${DOCKERHUB_PASS}"
                        }
                    }
                }

            stage('Push Images') {
            steps {
                echo 'Push Docker Images'
                sh "docker push ${DOCKERHUB_USER}/eurekaregistry"
                sh "docker push ${DOCKERHUB_USER}/apigateway"
                sh "docker push ${DOCKERHUB_USER}/InterviewerService"
                sh "docker push ${DOCKERHUB_USER}/CandidateService"
                // sh "docker build -t ${DOCKERHUB_USER}/accountservice -f Dockerfiles/AccountServiceDockerfile ."
                // sh "docker build -t ${DOCKERHUB_USER}/notificationservice -f Dockerfiles/NotificationServiceDockerfile ."
                // sh "docker build -t ${DOCKERHUB_USER}/frontend -f Dockerfiles/FrontendDockerfile ."
            }
        }
    }
}
