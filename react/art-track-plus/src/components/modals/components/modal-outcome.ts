enum ModalResult {
    ok,
    cancel,
    yes,
    no
}

enum ModalType {
    alert,
    confirm,
    input,
    yesNo,
    yesNoCancel
}

class ModalOutcome {
    result: ModalResult;
    type: ModalType;
}

export default ModalOutcome;
