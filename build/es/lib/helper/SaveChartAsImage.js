

import saveAsPng from "save-svg-as-png";
import { isDefined } from "../utils";

var dx = 0;
var dy = 0;

var SaveChartAsImage = {
	save: function save(doc, container, background, cb) {
		saveAsPng.svgAsDataUri(container.getElementsByTagName("svg")[0], {}, function (uri) {
			// eslint-disable-next-line prefer-const
			var image = new Image();
			image.onload = function () {

				// eslint-disable-next-line prefer-const
				var canvas = doc.createElement("canvas");
				canvas.width = image.width;
				canvas.height = image.height;

				// eslint-disable-next-line prefer-const
				var context = canvas.getContext("2d");

				if (isDefined(background)) {
					context.fillStyle = background;
					context.fillRect(0, 0, canvas.width, canvas.height);
				}
				var canvasList = container.getElementsByTagName("canvas");
				for (var i = 0; i < canvasList.length; i++) {
					var each = canvasList[i];
					if (isDefined(each)) {
						var parent = each.parentNode.parentNode.getBoundingClientRect();
						var rect = each.getBoundingClientRect();
						context.drawImage(each, rect.left - parent.left + dx, rect.top - parent.top + dy);
					}
				}

				context.drawImage(image, dx, dy);
				cb(canvas.toDataURL("image/png"));
			};
			image.src = uri;
		});
	},
	saveWithWhiteBG: function saveWithWhiteBG(doc, container, cb) {
		return this.saveWithBG(doc, container, "white", cb);
	},
	saveWithDarkBG: function saveWithDarkBG(doc, container, cb) {
		return this.saveWithBG(doc, container, "#1a1a1a", cb);
	},
	saveWithBG: function saveWithBG(doc, container, background, cb) {
		return this.save(doc, container, background, cb);
	},
	saveChartAsImage: function saveChartAsImage(container) {
		this.saveWithDarkBG(document, container, function (src) {
			var a = document.createElement("a");
			a.setAttribute("href", src);
			a.setAttribute("download", "Chart.png");

			document.body.appendChild(a);
			a.addEventListener("click", function () /* e */{
				a.parentNode.removeChild(a);
			});

			a.click();
		});
	}
};

export default SaveChartAsImage;
//# sourceMappingURL=SaveChartAsImage.js.map