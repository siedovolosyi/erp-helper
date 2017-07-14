(function() {
  let observerOfTodoBody;
  const locationArr = window.location.pathname.split('/');

  if (locationArr[1] !== 'applications' || locationArr[2] !== 'todo') {
    return false;
  }

  function getInputsToFill() {
    return document
      .querySelectorAll('form[name="client_id_document_form"] input:not([disabled]):not([type=hidden]):not([type=file]),select:not([disabled]):not(#application_status)');
  }

  function getSatisfactoryInputs() {
    return document
      .querySelectorAll('form[name="client_id_document_form"] input[type="radio"]:not([disabled])');
  }

  function onTodoBodyChange(callback) {
    const target = document.querySelector('.todo_col2');
    if (observerOfTodoBody) {
      observerOfTodoBody.disconnect();
    }

    observerOfTodoBody = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          callback();
        }
      });
    });

    observerOfTodoBody.observe(target, {childList: true, subtree: true});
  }

  function fillSatisfatoryInputs() {
    for (const satisfactory of document
      .querySelectorAll('form[name="client_id_document_form"] input[type="radio"]:not([disabled])')) {

      if (satisfactory.name.match(/\[[a-zA-Z]*]/)[0] === '[isSatisfactorily]' && satisfactory.value === '1') {
        satisfactory.click();
      }
    }
  }

  function fillCreditDbUpdateTodo() {
    const form = document.querySelector('form[name="creditdb_request_form"]');
    const inputName = form.elements[0].elements[0].name;
    const id = inputName.match(/[\d]+/)[0];
    const selectorStart = `[name="md[${id}][`;

    const unlockManual = document.querySelector(`${selectorStart}unlockForManual]"]`);

    if (!unlockManual.checked) {
      unlockManual.click();
    }

    if (!unlockManual.checked) {
      return false;
    }

    Helper.setValue(`${selectorStart}debtAmount]"]`, 0);
    Helper.setValue(`${selectorStart}debtCount]"]`, 0);
    Helper.setValue(`${selectorStart}loanAmount]"]`, 0);
    Helper.setValue(`${selectorStart}loanCount]"]`, 0);
    Helper.setValue(`${selectorStart}loanMonthlyAmount]"]`, 0);
    Helper.setValue(`${selectorStart}worstStatus]"]`, 0);
    Helper.setValue(`${selectorStart}debtAmountRelated]"]`, 0);
    Helper.setValue(`${selectorStart}debtCountRelated]"]`, 0);
    Helper.setValue(`${selectorStart}loanAmountRelated]"]`, 0);
    Helper.setValue(`${selectorStart}loanCountRelated]"]`, 0);
    Helper.setValue(`${selectorStart}loanMonthlyAmountRelated]"]`, 0);
    Helper.setValue(`${selectorStart}worstStatusRelated]"]`, 0);
    Helper.setValue(`${selectorStart}lastInquiryDate]"]`, Helper.generateRandomDate());
  }

  function fillIdDocumentForm() {
    const addDocumentButton = document.querySelector('#add-id-document');

    let inputsToFill = getInputsToFill();

    const insertData = () => {
      inputsToFill = getInputsToFill();

      for (const input of inputsToFill) {
        switch (input.name.match(/\[[a-zA-Z]*]/)[0]) {
          case'[documentType]':
            input.value = 'passport';
            break;
          case'[documentNumber]':
            input.value = Helper.generateRandomInteger(1000, 99999);
            break;
          case'[expiryDate]':
            input.value = Helper.generateRandomDate(true);
            break;
          case'[isPhoneNumberCallable]':
            if (input.value === '1') {
              input.click();
            }
            break;
          default:
            break;
        }
      }

      fillSatisfatoryInputs();
    };


    if (inputsToFill.length === 0 && addDocumentButton) {
      onTodoBodyChange(insertData);

      addDocumentButton.click();

      return true;
    } else if (inputsToFill.length === 0) {
      return false;
    }

    insertData();
  }


  switch (locationArr[4]) {
    case 'creditdb-update':
      fillCreditDbUpdateTodo();
      break;
    case 'id-document':
      fillIdDocumentForm();
      break;
    default:
      break;
  }

})();