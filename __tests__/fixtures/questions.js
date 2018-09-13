const questionsFixture = [
  {
    id: "q-researcher_name",
    variable_name: "researcher_name",
    input_type: "short_text",
    title: "Researcher Name"
  },
  {
    id: "q-researcher_phone",
    variable_name: "researcher_phone",
    input_type: "short_text",
    title: "Researcher Phone"
  },
  {
    id: "q-researcher_email",
    variable_name: "researcher_email",
    input_type: "short_text",
    title: "Researcher Email"
  },
  {
    id: "q-session_goal",
    variable_name: "session_goal",
    input_type: "long_text",
    title: "What is the goal of the session?",
    hint:
      "e.g. We are conducting research to help us evaluate the ease of use and content of a website."
  },
  {
    id: "q-product_goal",
    variable_name: "product_goal",
    input_type: "long_text",
    title: "What is the goal of the product?",
    hint:
      "e.g. This will help us create an online tool that will make it easier for Veterans to determine which VAC services are relevant to them."
  },
  {
    id: "q-session_activity",
    variable_name: "session_activity",
    input_type: "long_text",
    title: "What activity will take place during the session?",
    hint:
      "e.g. To do this, we will ask you to complete specific tasks with this prototype and ask you to describe your thoughts and impressions."
  },
  {
    id: "q-session_duration",
    title: "How long will the session take?",
    input_type: "long_text",
    variable_name: "session_duration",
    hint: "e.g. This will take us approximately 1 hour."
  },
  {
    id: "q-confidentiality",
    title: "Confidentiality",
    input_type: "multiple_choice",
    variable_name: "confidentiality",
    multiple_choice_options: ["o-confidential", "o-anonymous", "o-anonymized"]
  }
];

export default questionsFixture;
