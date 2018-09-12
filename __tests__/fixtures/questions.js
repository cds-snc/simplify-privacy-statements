const questionsFixture = [
  {
    variable_name: "researcher_name",
    input_type: "short_text",
    title: "Researcher Name"
  },
  {
    variable_name: "researcher_phone",
    input_type: "short_text",
    title: "Researcher Phone"
  },
  {
    variable_name: "researcher_email",
    input_type: "short_text",
    title: "Researcher Email"
  },
  {
    variable_name: "session_goal",
    input_type: "long_text",
    title: "What is the goal of the session?",
    hint:
      "e.g. We are conducting research to help us evaluate the ease of use and content of a website."
  },
  {
    variable_name: "product_goal",
    input_type: "long_text",
    title: "What is the goal of the product?",
    hint:
      "e.g. This will help us create an online tool that will make it easier for Veterans to determine which VAC services are relevant to them."
  },
  {
    variable_name: "session_activity",
    input_type: "long_text",
    title: "What activity will take place during the session?",
    hint:
      "e.g. To do this, we will ask you to complete specific tasks with this prototype and ask you to describe your thoughts and impressions."
  },
  {
    title: "How long will the session take?",
    input_type: "long_text",
    variable_name: "session_duration",
    hint: "e.g. This will take us approximately 1 hour."
  }
];

export default questionsFixture;
