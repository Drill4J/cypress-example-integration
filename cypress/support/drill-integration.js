import createDrillAutoTestAgent from '@drill4j/js-auto-test-agent';

const DRILL_AGENT_ID = 'pet-standalone';
const DRILL_ADMIN_URL = 'http://localhost:8090';

const DRILL_HEADERS = {
  TEST_NAME: 'drill-test-name',
  SESSION_ID: 'drill-session-id',
};

let drillAutotestAgent;

before(function(done) {
  createDrillAutoTestAgent({
    'agentId': DRILL_AGENT_ID,
    'adminUrl': DRILL_ADMIN_URL,
  }).then((data) => {
    drillAutotestAgent = data;
    done();
  })
});

after(function (done) {
  drillAutotestAgent.destroy().then(done);
});

beforeEach(function() {
  const currentTest = this.currentTest;
  cy.intercept(
    {
      url: /^.*$/, // that can be tweaked to avoid injecting drill4j headers to external resources
    },
    (req) => {
      req.headers[DRILL_HEADERS.TEST_NAME] = getTestName(currentTest);
      req.headers[DRILL_HEADERS.SESSION_ID] = drillAutotestAgent.sessionId;
    }
  );
});

function getTestName(currentTest) {
  return `${currentTest.parent.title} / ${currentTest.title}`
}
