import {render} from "@ember/test-helpers";
import {setupRenderingTest} from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import {module, test} from "qunit";

const DISMISS_SELECTOR = ".dialog-dismiss";

module("Integration | Component | alert-message", function(hooks) {
	test("it renders", async function(assert) {
		this.set("sampleText", "template block text");
		await render(hbs`{{alert-message}}`);

		assert.equal(this.element.textContent.trim(), "");

		// Template block usage:
		await render(hbs`
		{{#alert-message dismissible=false}}
			{{sampleText}}
		{{/alert-message}}
    `);

		assert.equal(this.element.textContent.trim(), this.get("sampleText"));
	});

	test("it is a `<dialog>` element", async function(assert) {
		await render(hbs`{{alert-message}}`);
		assert.equal(this.$("dialog:first").length, 1);
	});

	test("it has an `open` attribute by default", async function(assert) {
		await render(hbs`{{alert-message}}`);

		assert.ok(this.$("dialog:first").attr("open"));
	});

	test("it has a dismiss button when the user allows dismissal", async function(assert) {
		await render(hbs`{{alert-message}}`);

		assert.ok(this.$(DISMISS_SELECTOR).length > 0);
	});

	test("it doesn't have a dismiss button when the user disables dismissal", async function(assert) {
		await render(hbs`{{alert-message dismissible=false}}`);

		assert.equal(this.$(DISMISS_SELECTOR).length, 0);
	});

	test("it sets the close text when the user overrides it", async function(assert) {
		this.set("dismissText", "Dismiss");

		await render(hbs`{{alert-message dismissText=dismissText}}`);

		assert.equal(this.$(DISMISS_SELECTOR).text().trim(), this.get("dismissText"));
	});

	test("it dismisses when the user calls dismiss", async function(assert) {
		assert.expect(2);
		await render(hbs`{{alert-message}}`);

		let $component = this.$("dialog:first");
		assert.equal($component.is(":visible"), true, "Dialog is visible by default");
		this.$(DISMISS_SELECTOR).click();

		assert.equal(this.$("dialog:first").is(":visible"), false, "Dialog is hidden when dismiss button is clicked");
	});

	test("Binds `aria-describedby` and `aria-labelledby` attributes to title and description respectively", async function(assert) {
		assert.expect(2);
		this.set("sampleTitle", "A sample title");
		this.set("sampleDescription", "A sample description");

		await render(hbs`{{alert-message title=sampleTitle description=sampleDescription}}`);

		let $component = this.$("dialog:first");
		assert.equal($component.attr("aria-describedby"), this.get("sampleDescription"), "Has proper description");
		assert.equal($component.attr("aria-labelledby"), this.get("sampleTitle"), "Has proper label");
	});

	test("it displays the `title` and `description` only if block params aren't provided", async function(assert) {
		const sampleTitle = "A sample title";
		const sampleDescription = "A sample description";
		this.set("sampleTitle", sampleTitle);
		this.set("sampleDescription", sampleDescription);

		await render(hbs`{{alert-message title=sampleTitle description=sampleDescription}}`);

		let $component = this.$("dialog:first");

		assert.equal($component.find(".dialog-title").text().trim(), sampleTitle);
		assert.equal($component.find(".dialog-description").text().trim(), sampleDescription);

		const message = "Sorry, but the operation failed";
		this.set("message", message);
		await render(hbs`{{#alert-message title=sampleTitle description=sampleDescription dismissible=false}}<h1>{{message}}</h1>{{/alert-message}}`);

		$component = this.$("dialog:first");

		assert.equal($component.text().trim(), message);
	});
});
