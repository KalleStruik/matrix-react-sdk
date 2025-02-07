/*
Copyright 2022 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/// <reference types="cypress" />

import { SynapseInstance } from "../../plugins/synapsedocker";
import type { UserCredentials } from "../../support/login";

describe("UserMenu", () => {
    let synapse: SynapseInstance;
    let user: UserCredentials;

    beforeEach(() => {
        cy.startSynapse("consent").then(data => {
            synapse = data;

            cy.initTestUser(synapse, "Jeff").then(credentials => {
                user = credentials;
            });
        });
    });

    afterEach(() => {
        cy.stopSynapse(synapse);
    });

    it("should contain our name & userId", () => {
        cy.get('[aria-label="User menu"]', { timeout: 15000 }).click();
        cy.get(".mx_UserMenu_contextMenu_displayName").should("contain", "Jeff");
        cy.get(".mx_UserMenu_contextMenu_userId").should("contain", user.userId);
    });
});
