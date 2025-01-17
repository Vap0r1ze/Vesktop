/*
 * SPDX-License-Identifier: GPL-3.0
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2023 Vendicated and Vencord contributors
 */

import { Settings } from "renderer/settings";

import { addPatch } from "./shared";

if (Settings.store.discordWindowsTitleBar)
    addPatch({
        patches: [
            {
                find: ".wordmarkWindows",
                replacement: [
                    {
                        // TODO: Fix eslint rule
                        // eslint-disable-next-line no-useless-escape
                        match: /case \i\.\i\.WINDOWS:/,
                        replace: 'case "WEB":'
                    },
                    ...["close", "minimize", "maximize"].map(op => ({
                        match: new RegExp(String.raw`\i\.default\.${op}\b`),
                        replace: `VesktopNative.win.${op}`
                    }))
                ]
            }
        ]
    });
