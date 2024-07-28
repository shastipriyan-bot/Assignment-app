const httpRequests = require("./httpRequests");

exports = {
  onAgentUpdateHandler: function (payload) {
    const { logged_in } = payload.data.changes.misc_changes;
    if (!logged_in[0] && logged_in[1]) {
      return console.log("no logout");
    }

    const date = new Date();

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    console.log(`Today's date ${formattedDate}`);

    const agentId = payload.data.agent.user_id;

    //     const agentId = 72025350026;

    //     console.log("get the id", agentId);

    // .filter(
    //   (item) =>
    //     selectedGroups.includes(String(item.group_id)) &&
    //     item.custom_fields.cf_signing_date !== currentDate
    // )

    this.searchForOpenTicketsfun(payload, agentId, formattedDate);
  },

  searchForOpenTicketsfun: async function (payload, id, formattedDate) {
    //     console.log("got here", id);

    let allResults = [];
    let page = 1;
    let totalResults = 0;

    do {
      const response = await httpRequests.searchForOpenTickets(
        payload,
        id,
        formattedDate,
        page
      );

      const results = response.results;
      totalResults = response.total;

      allResults = allResults.concat(results);
      page++;
    } while (allResults.length < totalResults && page <= 10);

    allResults.length
      ? this.checkForTheSelectedGroups(payload, allResults)
      : console.log("There is no data available");
  },

  checkForTheSelectedGroups: async function (payload, res) {
    const selectedGroups = payload.iparams.groups;

    // console.log("In the check group", selectedGroups, res);

    const filteredIds = res

      .filter((item) => selectedGroups.includes(String(item.group_id)))
      .map((item) => item.id);

    console.log("Filtered responder IDs:", filteredIds);

    filteredIds.length
      ? this.updateFreshdeskTicketsfun(payload, filteredIds)
      : console.log("there is no ticket with the selected groups");
  },

  updateFreshdeskTicketsfun: async function (payload, ids) {
    const results = await httpRequests.updateFreshdeskTickets(payload, ids);

    console.log("All done", results);
  },
};
