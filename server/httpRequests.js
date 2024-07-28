const axios = require("axios");

const btoa = require("btoa");

const searchForOpenTickets = async function (payload, id, date, page) {
  console.log("page", page);

  try {
    const config = {
    
      method: "get",

      // url: `https://${payload.iparams.fd_domain}/api/v2/search/tickets?query="status:2 AND agent_id:${id} AND  cf_signing_date:<'${date}'"&page=${page}`,

      url : `https://${payload.iparams.fd_domain}/api/v2/search/tickets?query="status:2 AND agent_id:${id} AND (cf_signing_date:<'${date}' OR cf_signing_date:null)"&page=${page}`,

      headers: {
        Authorization: `Basic ${btoa(payload.iparams.fd_apikey)}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios(config);
    // console.log("this is the result", response.data);
    return response.data;
  } catch (error) {
    console.log("error happened", error);
  }
};

const updateFreshdeskTickets = async function (payload, ids) {
  console.log("this is ids", ids);

  try {
    const body = {
      bulk_action: {
        ids: ids,
        properties: {
          responder_id: null,
        },
      },
    };

    // console.log("this is body", JSON.stringify(body));

    const config = {
      method: "post",
      url: `https://${payload.iparams.fd_domain}/api/v2/tickets/bulk_update`,
      headers: {
        Authorization: `Basic ${btoa(payload.iparams.fd_apikey)}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: body,
    };

    const response = await axios(config);

    // console.log("update response", response.data);

    return response.data;
  } catch (error) {
    console.log("Error happened", error);
    throw error;
  }
};

exports = {
  searchForOpenTickets: searchForOpenTickets,
  updateFreshdeskTickets: updateFreshdeskTickets,
};
