class S4SLoginCreate extends S4SLoginBase {
  constructor() {
    super()
  }

  addLoginElements() {
    const wrapper = this.createElement("div", { classes: ["s4s-login"] })
    const elementsToBeAddedOnWrapper = [
      this.createElement("h1", { classes: ["h2"], innerText: this.content.login.heading }),
      this.createForm(),
      document.createElement("hr"),
      this.createForgotPassword(),
      this.createElement("h2", { classes: ["h3"], innerText: this.content.login.subHeading }),
      this.createButtonRegister(),
      this.createForgotPasswordModal(),
      this.createRegisterModal()
    ]
    this.appendChildren(wrapper, elementsToBeAddedOnWrapper)
    this.appendChild(wrapper)
    this.setAttribute("hidden", true)
    this.wrapper = wrapper
  }

  createForm() {
    const form = document.createElement("form")
    form.addEventListener("submit", event => {
      event.preventDefault()
      const allInputs = Array.from(form.querySelectorAll("s4s-input"))
      const isValidForm = allInputs.filter(item => !item.doValidation()).length === 0
      if (isValidForm) {
        this.httpRequest("s4s-components/get-profile", { method: "POST" }, data => {
          const status = data.status
          if (status !== 200) {
            this.publish("getProfileDone", { status })
            return
          }
          return data.json().then(profileData => {
            this.publish("getProfileDone", { status, data: profileData })
          })
        })
      }
    })

    const requiredField = this.createElement("p", {
      classes: ["text-right"],
      innerText: this.content.login.requiredText
    })
    form.appendChild(requiredField)

    this.content.login.inputFields.forEach(field => {
      const input = this.createInput(field)
      form.appendChild(input)
    })

    const submit = this.createElement("button", {
      innerText: this.content.login.submitLabel,
      classes: ["block-element"]
    })
    form.appendChild(submit)
    return form
  }

  createForgotPassword() {
    const forgotPassword = this.createElement("button", {
      innerText: this.content.login.passwordReset.text,
      classes: ["reset", "btn-link"]
    })
    forgotPassword.addEventListener("click", event =>
      this.publish("modalVisibility", { visible: true, id: this.content.login.modals.forgotPassword.id })
    )
    return forgotPassword
  }

  createInput(field) {
    const input = this.createElement("s4s-input", { classes: ["block-element"] })
    for (const key in field) {
      input.setAttribute(key, field[key])
    }
    return input
  }

  createButtonRegister() {
    const buttonRegister = this.createElement("button", {
      innerText: this.content.login.buttonLabel,
      classes: ["block-element", "btn-secondary"]
    })
    buttonRegister.addEventListener("click", event =>
      this.publish("modalVisibility", { visible: true, id: this.content.login.modals.register.id })
    )
    return buttonRegister
  }

  createForgotPasswordModal() {
    const {
      login: {
        modals: { forgotPassword }
      }
    } = this.content
    const modal = document.createElement("s4s-modal")
    modal.setAttribute("modal-id", forgotPassword.id)
    modal.setAttribute("hidden", true)
    modal.innerHTML = `
    <h1 class=${forgotPassword.heading.class}>${forgotPassword.heading.text}</h1>
    <h2 class=${forgotPassword.subheading.class}>${forgotPassword.subheading.text}</h2>
    <form
    class=${forgotPassword.form.class}
    >
    <s4s-input 
      class= ${forgotPassword.form.input.class}
      label=${forgotPassword.form.input.label} 
      name=${forgotPassword.form.input.name} 
      type=${forgotPassword.form.input.type} 
      message=${forgotPassword.form.input.message}
      validation=${forgotPassword.form.input.validation}
    >
    </s4s-input>
    <button 
      type=${forgotPassword.form.submit.type}
      class=${forgotPassword.form.submit.class}
    >
      ${forgotPassword.form.submit.text}
    </button>
    <form>
    `
    return modal
  }

  createRegisterModal() {
    const {
      login: {
        modals: { register }
      }
    } = this.content

    const modal = document.createElement("s4s-modal")
    modal.setAttribute("modal-id", register.id)
    modal.setAttribute("hidden", true)
    modal.innerHTML = `
    <h1 class=${register.heading.class}>${register.heading.text}</h1>
    <form
    class=${register.form.class}
    >
    <s4s-input 
      class= ${register.form.input.class}
      label=${register.form.input.label} 
      name=${register.form.input.name} 
      type=${register.form.input.type} 
      message=${register.form.input.message}
      validation=${register.form.input.validation}
    >
    </s4s-input>
    <button 
      type=${register.form.submit.type}
      class=${register.form.submit.class}
    >
      ${register.form.submit.text}
    </button>
    <form>
    `
    return modal
  }
}
