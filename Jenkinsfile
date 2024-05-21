pipeline {

environment {
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
                sh "ls"
                sh "cd APIGateway"
                sh "ls"
                sh "cd target"
                sh "docker build -t ${DOCKERHUB_USER}/eurekaregistry -f Dockerfiles/ServiceRegistryDockerfile ."
                sh "docker build -t ${DOCKERHUB_USER}/apigateway -f Dockerfiles/APIGatewayServiceDockerfile ."
                sh "docker build -t ${DOCKERHUB_USER}/userservice -f Dockerfiles/UserServiceDockerfile ."
                sh "docker build -t ${DOCKERHUB_USER}/accountservice -f Dockerfiles/AccountServiceDockerfile ."
                sh "docker build -t ${DOCKERHUB_USER}/notificationservice -f Dockerfiles/NotificationServiceDockerfile ."
                sh "docker build -t ${DOCKERHUB_USER}/frontend -f Dockerfiles/FrontendDockerfile ."
            }
        }
    }
}
