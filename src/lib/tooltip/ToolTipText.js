

import React, { Component } from "react";
import PropTypes from "prop-types";
import settings from "../../settings";

class ToolTipText extends Component {
	render() {
		return <text
			fontFamily={this.props.fontFamily}
			fontSize={this.props.fontSize}
			{...this.props}
			className="react-stockcharts-tooltip">{this.props.children}</text>;
	}
}

ToolTipText.propTypes = {
	fontFamily: PropTypes.string.isRequired,
	fontSize: PropTypes.number.isRequired,
	children: PropTypes.node.isRequired,
};

ToolTipText.defaultProps = {
	fontFamily: settings.fontFamily,
	fontSize: settings.fontSizeSmall,
};

export default ToolTipText;
