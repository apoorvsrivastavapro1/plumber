const sonarqubeScanner = require('sonarqube-scanner').default;
sonarqubeScanner(
    {
        serverUrl: 'SONAR_SERVER_URL',
        token: 'sqp_PROJECT_TOKEN',
        options: {
            'sonar.projectName': 'PROJECT_NAME',
            'sonar.projectKey': 'PROJECT_KEY',
            'sonar.sources': '.',
        },
    },
    () => {},
);
