import Ember from "ember";
import layout from "../templates/components/alert-message";

export default Ember.Component.extend({
	tagName: "dialog",
	layout: layout,
	attributeBindings: ["open", "role", "aria-labelledby", "aria-describedby"],
	modal: false,
	title: null,
	description: null,
	open: true,
	"aria-labelledby": Ember.computed.alias("title"),
	"aria-describedby": Ember.computed.alias("description"),
	dismissText: "x",
	dismissible: true,
	role: Ember.computed("modal", function() {
		return this.get("modal") ? "alertdialog" : "dialog";
	}),
	actions: {
		dismiss() {
			this.toggleProperty("open");
		}
	}
});
