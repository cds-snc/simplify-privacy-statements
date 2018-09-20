const templateFixture = [
  {
    logic_type: "always_include",
    display_text: "text1",
    section_name: "section1",
    Guidance: "guidance1"
  },
  {
    logic_type: "always_include",
    display_text: "text2 {researcher_name} {researcher_email} {researcher_name}"
  },
  {
    logic_type: "if",
    variable_1: ["q-confidentiality"],
    test: "equals",
    variable_2: ["o-anonymous"],
    display_text: "text3 {researcher_phone} is anonymous"
  }
];

export default templateFixture;
