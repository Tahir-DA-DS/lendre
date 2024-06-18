import axios from 'axios';

const checkBlacklist = async (email: string): Promise<boolean> => {
  const response = await axios.get(`https://adjutor.lendsqr.com/v2/verification/karma/${email}`, {
    headers: {
      Authorization: `Bearer ${process.env.LENDSQL_API_KEY}`,
    },
  });

  return response.data.blacklisted;
};

export default { checkBlacklist };
