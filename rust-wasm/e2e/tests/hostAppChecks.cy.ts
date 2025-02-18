import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors, selectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {CssAttr} from "../../../cypress/types/cssAttr";
import {StubTypes} from "../../../cypress/types/stubTypes";

const basePage: BaseMethods = new BaseMethods()

describe("It checks host app", () => {
    beforeEach(() => {
        basePage.openLocalhost(8080)
    })

    it('Checks basic console message', () => {
        basePage.checkInfoInConsole(Constants.commonPhrases.rustWasmConsoleMessages.baseLoadingMessage)
    })

    it('Checks app header visibility', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h1,
            text: Constants.commonPhrases.commonHostAppName,
            visibilityState: 'be.visible'
        })
    })

    it('Checks there are three buttons on page', () => {
        basePage.checkElementQuantity({
            selector: baseSelectors.button,
            quantity: 3
        })
    })

    it('Checks all buttons are not disabled', () => {
        basePage.checkElementState({
            selector: baseSelectors.button,
            state: ':disabled',
            isMultiple: true,
            jqueryValue: false
        })
    })

    it('Checks all buttons names visibility', () => {
        Constants.commonText.rustWasmAppButtonsNames.forEach((name: string) => {
            if (name !== Constants.commonText.rustWasmAppButtonsNames[3]) {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.button,
                    text: name,
                    visibilityState: 'be.visible'
                })
            }
        })
    })

    it('Checks all buttons shares same color', () => {
        basePage.checkElementHaveProperty({
            selector: baseSelectors.button,
            prop: CssAttr.css,
            value: Constants.color.lightGrey,
            isMultiple: true
        })
    })

    it('Checks that Play button name changed to Stop after click', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.commonText.rustWasmAppButtonsNames[0],
            visibilityState: 'be.visible'
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.commonText.rustWasmAppButtonsNames[3],
            isVisible: false,
        })
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.commonText.rustWasmAppButtonsNames[0]
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.commonText.rustWasmAppButtonsNames[0],
            isVisible: false,
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.commonText.rustWasmAppButtonsNames[3],
            visibilityState: 'be.visible'
        })
    })

    it('Checks that start button name returns to Play after reload', () => {
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.commonText.rustWasmAppButtonsNames[0]
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.commonText.rustWasmAppButtonsNames[0],
            isVisible: false,
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.commonText.rustWasmAppButtonsNames[3],
            visibilityState: 'be.visible'
        })
        basePage.reloadWindow()
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.commonText.rustWasmAppButtonsNames[0],
            visibilityState: 'be.visible'
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.commonText.rustWasmAppButtonsNames[3],
            isVisible: false,
        })
    })

    it('Checks infinite looping started on game board after appearing', () => {
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.commonText.rustWasmAppButtonsNames[0]
        })
        basePage.checkElementVisibility(selectors.rustWasmGameBoard)
        basePage.checkInfoInConsole(Constants.commonPhrases.rustWasmConsoleMessages.startLoopMessage)
    })

    it('Checks looping stopped after reload', () => {
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.commonText.rustWasmAppButtonsNames[0]
        })
        basePage.checkElementVisibility(selectors.rustWasmGameBoard)
        basePage.checkInfoInConsole(Constants.commonPhrases.rustWasmConsoleMessages.startLoopMessage)
        basePage.reloadWindow()
        basePage.checkElementVisibility(selectors.rustWasmGameBoard, false)
        basePage.checkInfoInConsole(Constants.commonPhrases.rustWasmConsoleMessages.startLoopMessage, StubTypes.notToBeCalled)
    })

    it('Checks looping can be stopped by Stop button', () => {
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.commonText.rustWasmAppButtonsNames[0]
        })
        basePage.checkElementVisibility(selectors.rustWasmGameBoard)
        basePage.checkInfoInConsole(Constants.commonPhrases.rustWasmConsoleMessages.stopLoopMessage,StubTypes.notToBeCalled, false)
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.commonText.rustWasmAppButtonsNames[3]
        })
        basePage.checkInfoInConsole(Constants.commonPhrases.rustWasmConsoleMessages.stopLoopMessage,StubTypes.beCalled, false, false)
    })
})