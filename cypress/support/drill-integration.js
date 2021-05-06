import createDrillAutoTestAgent from '@drill4j/js-auto-test-agent';

const DRILL_AGENT_ID = 'ScalaExampleAgent';
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

afterEach(function() {
  const currentTest = this.currentTest;
  const { state, duration, wallClockStartedAt } = this.currentTest;
  const testName = getTestName(currentTest);
  drillAutotestAgent.addTest(testName, convertTestState(state), wallClockStartedAt.valueOf(), duration);
});

function convertTestState(state) {
  // cases - Cypress test states. See https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Test-statuses
  // return values - Drill4J test states
  switch (state) {
    case 'passed': return 'PASSED';
    case 'failed': return 'FAILED';
    // TODO tbd - mocha does not call afterEach hook for pending or skipped tests
    // 'pending' === 'skipped' in mocha
    // see https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Pending    case 'pending': return 'SKIPPED';
    case 'skipped': return 'SKIPPED';
    // TODO tbd - is that necessary?
    default: return 'UNKNOWN';
  }
}

function getTestName(currentTest) {
  const nestedTestSeparator = ' / ';
  const parentName = getParentNameChain(currentTest)
    .filter(x => x)
    .reverse()
    .join(nestedTestSeparator);
  return `${parentName}${nestedTestSeparator}${currentTest.title}`
}

function getParentNameChain(currentTest) {
  const res = [];
  let ptr = currentTest.parent;
  res.push(ptr.title);
  while (ptr.parent) {
    ptr = ptr.parent;
    res.push(ptr.title)
  }
  return res;
}
