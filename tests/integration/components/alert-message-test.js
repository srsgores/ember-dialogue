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
	assert.equal(this.$("dialog:first").length, 1);
});

test("it has an `open` attribute by default", function(assert) {
	this.render(hbs`{{alert-message}}`);

	assert.ok(this.$("dialog:first").attr("open"));
});

test("it has a dismiss button when the user allows dismissal", function(assert) {
	this.render(hbs`{{alert-message}}`);

	assert.ok(this.$(DISMISS_SELECTOR).length > 1);
});

test("it dismisses when the user calls dismiss", function(assert) {
	assert.expect(2);
	this.render(hbs`{{alert-message}}`);

	let $component = this.$("dialog:first");
	assert.equal($component.is(":visible"), true, "Dialog is visible by default");
	this.$(DISMISS_SELECTOR).click();

	assert.equal(this.$("dialog:first").is(":visible"), false, "Dialog is hidden when dismiss button is clicked");
});

test("Binds `aria-describedby` and `aria-labelledby` attributes to title and description respectively", function(assert) {
	assert.expect(2);
	this.set("sampleTitle", "A sample title");
	this.set("sampleDescription", "A sample description");
	let $component = this.$("dialog:first");

	this.render(hbs`{{alert-message title=sampleTitle description=sampleDescription}}`);

	assert.equal($component.attr("aria-describedby"), this.get("sampleDescription"), "Has proper description");
	assert.equal($component.attr("aria-labelledby"), this.get("sampleTitle"), "Has proper label");
});
