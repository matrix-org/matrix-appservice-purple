/**
 * An interface for storing account data inside the userstore.
 */

import { helper, plugins, accounts } from "node-purple";
import { PurpleProtocol } from "./PurpleInstance";

export class PurpleAccount {
    private acctData: any;
    private handle?: External;
    private enabled: boolean;
    constructor(private username: string, private _protocol: PurpleProtocol) {
        this.enabled = false;
    }
    get name(): string { return this.acctData.name };

    get protocol() : PurpleProtocol { return this._protocol };

    get isEnabled(): boolean { return this.enabled };

    findAccount() {
        const data = accounts.find(this.username, this._protocol.id);
        if (!data) {
            throw new Error("Account not found");
        }
        this.handle = data.handle;
        this.enabled = accounts.get_enabled(this.handle);
        this.acctData = data;
    }

    createNew() {
        accounts.new(this.username, this._protocol.id);
    }

    setEnabled(enable: boolean) {
        accounts.set_enabled(this.handle, enable);
    }

    // connect() {
    //     accounts.connect(this.username, this.protocol.id);
    // }
}
