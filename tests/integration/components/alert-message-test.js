import {moduleForComponent, test} from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

const DISMISS_SELECTOR = ".dialog-dismiss";

moduleForComponent("alert-message", "Integration | Component | alert message", {
	integration: true
});

test("it renders", function(assert) {
	// Set any properties with this.set("myProperty", "value");
	// Handle any actions with this.on("myAction", function(val) { ... });

	this.render(hbs`{{alert-message}}`);

	assert.equal(this.$().text().trim(), "");

	// Template block usage:
	this.render(hbs`
		{{#alert-message}}
			template block text
		{{/alert-message}}
	`);

	assert.equal(this.$().text().trim(), "template block text");
});

test("it is a `<dialog>` element", function(assert) {
	this.render(hbs`{{alert-message}}`);

	assert.equal(this.tagName.toLowerCase(), "dialog");
});

test("it has an `open` attribute by default", function(assert) {
	this.render(hbs`{{alert-message}}`);

	assert.ok(this.$().attr("open"));
});

test("it has a dismiss button when the user allows dismissal", function(assert) {
	this.render(hbs`{{alert-message}}`);

	assert.ok(this.$(DISMISS_SELECTOR).length > 1);
});

test("it dismisses when the user calls dismiss", function(assert) {
	this.render(hbs`{{alert-message}}`);

	this.$(DISMISS_SELECTOR).click();
	assert.equal(this.$().is(":visible"), false);
});
