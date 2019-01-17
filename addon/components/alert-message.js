import Component from "@ember/component";
import {computed} from "@ember/object";
import layout from "../templates/components/alert-message";

export default Component.extend({
	tagName: "dialog",
	layout: layout,
	attributeBindings: ["open", "role", "aria-labelledby", "aria-describedby"],
	modal: false,
	title: null,
	hasTitle: computed.notEmpty("title"),
	description: null,
	hasDescription: computed.notEmpty("description"),
	open: true,
	"aria-labelledby": computed.alias("title"),
	"aria-describedby": computed.alias("description"),
	dismissText: "x",
	dismissible: true,
	role: computed("modal", function() {
		return this.get("modal") ? "alertdialog" : "dialog";
	}),
	actions: {
		dismiss() {
			this.toggleProperty("open");
			this.sendAction("onDismiss");
		}
	}
});
