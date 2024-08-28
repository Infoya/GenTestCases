import axios from "axios";

export const sendMessageToApi = async (messageText: string) => {
  try {
    const response = await axios.post(
      "http://35.202.207.81:5000/qa_agent_query",
      {
        query: [messageText],
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 300000, // 5 minutes in milliseconds
      }
    );

    return response.data.response; // Assuming the bot's response is in the 'response' field
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const sendMessageAttachmentsToApi = async (
  userInput: string,
  images: File[] | undefined
) => {
  try {
    console.log(images);

    const formData = new FormData();
    formData.append("userInput", userInput);

    images?.forEach((file, index) => {
      formData.append(`images`, file);
    });

    const response = await axios.post(
      "http://35.202.207.81:80/sendMessage",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );

    return response.data.response; // Assuming the bot's response is in the 'response' field
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
