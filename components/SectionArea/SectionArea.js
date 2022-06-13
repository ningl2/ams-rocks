import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "styles/jss/nextjs-material-kit/components/sectionStyle.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

const useStyles = makeStyles(styles);

export default function SectionArea(props) {
  const classes = useStyles();
  const { title, description, actionText, actionLink, imageSrc, imgAlt, align } = props;

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRounded,
    classes.imgFluid,
    classes.imgIndustry
  );

  return (
    <div className={classes.section}>
      <GridContainer>
        {align == "left" &&
          <GridItem xs={12} sm={4} md={4}>
            <img
              src={imageSrc}
              alt={imgAlt}
              className={imageClasses}
            />
          </GridItem>
        }
        <GridItem xs={12} sm={8} md={8}>
          <div className={classes.textSection}>
            <h3>{title}</h3>
            <p className={classes.description}>
              {description}
            </p>
            <a href={actionLink}>{actionText}</a>
          </div>
        </GridItem>
        {align == "right" &&
          <GridItem xs={12} sm={4} md={4}>
            <img
              src={imageSrc}
              alt={imgAlt}
              className={imageClasses}
            />
          </GridItem>
        }
      </GridContainer>
    </div >
  );
}

SectionArea.defaultProps = {
  iconColor: "gray",
};

SectionArea.propTypes = {
  icon: PropTypes.object.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  description: PropTypes.string.isRequired,
  iconColor: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  vertical: PropTypes.bool,
};
