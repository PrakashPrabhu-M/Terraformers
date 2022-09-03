import axios from "axios";
const endpoint = "http://127.0.0.1:8081/v1";
const secret = "DoItNow";
const requests = {
  init: (token) => ({
    login: async (loginData) => {
      try {
        const {
          data: { accessToken },
        } = await axios.post(`${endpoint}/user/login`, loginData, {
          headers: { password: secret },
        });
        console.log(accessToken);
        return accessToken;
      } catch (error) {
        console.log(error);
        if (error.response.data?.details?.[0]?.message)
          throw error.response.data?.details?.[0]?.message;
        throw error.response.data;
      }
    },

    register: async (registerData) => {
      try {
        await axios.post(`${endpoint}/user/register`, registerData, {
          headers: { password: secret },
        });
        return "User created";
      } catch (error) {
        if (error.response.data?.details?.[0]?.message)
          throw error.response.data?.details?.[0]?.message;
        throw error.response.data;
      }
    },

    allJobs: async () => {
      try {
        const jobs = await axios.get(`${endpoint}/job/all`, {
          headers: {
            password: secret,
            "Content-Type": "text/json",
            authorization: `Bearer ${token}`,
          },
        });
        // console.log(jobs);
        return jobs;
      } catch (error) {
        if (error.response.data?.details?.[0]?.message)
          throw error.response.data?.details?.[0]?.message;
        throw error.response.data;
      }
    },

    interestedUsers: async (JobId) => {
      try {
        const jobs = await axios.get(
          `${endpoint}/job/interested-users/${JobId}`,
          {
            headers: {
              password: secret,
              "Content-Type": "text/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        return jobs;
      } catch (error) {
        if (error.response.data?.details?.[0]?.message)
          throw error.response.data?.details?.[0]?.message;
        throw error.response.data;
      }
    },

    order: async (source, target) => {
      try {
        const { data } = await axios.post(
          `${endpoint}/job/newOrder`,
          { source, target },
          {
            headers: { password: secret, authorization: `Bearer ${token}` },
          }
        );
        return data;
      } catch (error) {
        if (error.response.data?.details?.[0]?.message)
          throw error.response.data?.details?.[0]?.message;
        throw error.response.data;
      }
    },

    addJob: async (data) => {
      try {
        await axios.post(`${endpoint}/job/add`, data, {
          headers: { password: secret, authorization: `Bearer ${token}` },
        });
      } catch (error) {
        if (error.response.data?.details?.[0]?.message)
          throw error.response.data?.details?.[0]?.message;
        throw error.response.data;
      }
    },

    mark: async (jobId) => {
      try {
        await axios.patch(
          `${endpoint}/job/mark`,
          { jobId },
          {
            headers: { password: secret, authorization: `Bearer ${token}` },
          }
        );
      } catch (error) {
        if (error.response.data?.details?.[0]?.message)
          throw error.response.data?.details?.[0]?.message;
        throw error.response.data;
      }
    },

    unMark: async (jobId) => {
      try {
        await axios.patch(
          `${endpoint}/job/unmark`,
          { jobId },
          {
            headers: { password: secret, authorization: `Bearer ${token}` },
          }
        );
      } catch (error) {
        if (error.response.data?.details?.[0]?.message)
          throw error.response.data?.details?.[0]?.message;
        throw error.response.data;
      }
    },

    markedJobs: async () => {
      try {
        const jobs = await axios.get(`${endpoint}/job/marked`, {
          headers: {
            password: secret,
            "Content-Type": "text/json",
            authorization: `Bearer ${token}`,
          },
        });
        // console.log(jobs);
        return jobs;
      } catch (error) {
        if (error.response.data?.details?.[0]?.message)
          throw error.response.data?.details?.[0]?.message;
        throw error.response.data;
      }
    },
  }),
};

export default requests;
