var RegionsExtras = require("regions-extras/marionette");

module.exports = {
    instance: null,

    /**
     * @returns {Marionette}
     */
    getInstance: function () {
        if (!this.instance) {
            if (typeof Marionette != "undefined") {
                this.instance = Marionette;
            }
            else {
                // may be regions extras known about marionette?
                this.instance = RegionsExtras.getInstance();
            }
        }

        if (!this.instance) {
            throw new Error("Cannot find marionette");
        }

        return this.instance;
    },

    /**
     * @param {Marionette} instance
     */
    setInstance: function (instance) {
        this.instance = instance;
        RegionsExtras.setInstance(instance);
    }
};