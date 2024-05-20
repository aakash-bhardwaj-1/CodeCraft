pipeline {
    environment {
        DOCKERHUB_CREDENTIALS = credentials('DockerHubCred')
        MYSQL_CREDENTIALS = credentials('MySqlCred')
        MYSQL_CREDENTIALS_USR = MYSQL_CREDENTIALS_USR.split(':')[0] // Extract username
        MYSQL_CREDENTIALS_PSW = MYSQL_CREDENTIALS_USR.split(':')[1] // Extract password
    }
    agent any
    options {
        // Timeout counter starts AFTER agent is allocated
        timeout(time: 1, unit: 'SECONDS')
    }
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
                sh 'cd ApiGateway && mvn clean install'
                sh 'mv -f APIGateway/target/APIGateway-0.0.1-SNAPSHOT.jar JarFiles/'
            }
        }


        stage('Maven Build Services') {
            parallel {


                stage('Candidate Service') {
                    steps {
                        echo 'Building User Service'
                        //username and password are provided for integration testing of server with mysql otherwise, no requirement
                        sh "cd UserService && mvn clean install -DSPRING_DATASOURCE_USERNAME=${MYSQL_CREDENTIALS_USR} -DSPRING_DATASOURCE_PASSWORD=${MYSQL_CREDENTIALS_PSW}"
                        sh 'mv -f CandidateMicroservice/target/CandidateMicroservice-0.0.1-SNAPSHOT.jar JarFiles/'
                    }
                }


                stage('Account Service') {
                    steps {
                        echo 'Building Account Service'
                        //username and password are provided for integration testing of server with mysql otherwise, no requirement
                        sh "cd AccountService && mvn clean install -DSPRING_DATASOURCE_USERNAME=${MYSQL_CREDENTIALS_USR} -DSPRING_DATASOURCE_PASSWORD=${MYSQL_CREDENTIALS_PSW}"
                        sh 'mv -f InterviewerMicroservice/target/InterviewerMicroservice-0.0.1-SNAPSHOT.jar JarFiles/'
                    }
                }


            }
        }
    }
}
