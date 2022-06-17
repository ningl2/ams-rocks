import { title } from "styles/jss/nextjs-material-kit.js";

const freeStyle = {
  section: {
    textAlign: "center",
    backgroundColor: "#0078d4",
    padding: "5px"
  },
  title: {
    ...title,
    textAlign:"center",
    color:"#fff",
    fontWeight:600,
    fontSize:"28px",
    lineHeight: "40px",
    padding: "0 0 2px"
  },
  description: {
    fontSize:"18px",
    fontWeight:"400",
    lineHeight:"28px",
    padding: "8px 0 0",
  },
  cardTitle : {
    ...title
  },
  callToAction : {
    marginBottom: "20px"
  }
};

export default freeStyle;
