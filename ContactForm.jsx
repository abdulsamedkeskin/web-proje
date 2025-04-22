function ContactForm({ onSubmit }) {
  const [formValues, setFormValues] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    department: "",
    newsletter: false,
    contactMethod: "Email",
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("İsim gerekli"),
    email: Yup.string().email("Geçersiz email").required("Email gerekli"),
    phone: Yup.string()
      .required("Telefon gerekli")
      .matches(/^\d+$/, "Telefon: Sadece rakam giriniz"),
    message: Yup.string().required("Mesaj gerekli"),
    department: Yup.string().required("Departman seçimi gerekli"),
    newsletter: Yup.boolean(),
    contactMethod: Yup.string().required("İletişim yöntemi seçimi gerekli"),
  });

  const validateWithJS = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formValues.name.trim()) errors.name = "İsim gerekli";
    if (!formValues.message.trim()) errors.message = "Mesaj gerekli";
    if (!formValues.department.trim()) errors.department = "Departman gerekli";
    if (!formValues.contactMethod.trim())
      errors.contactMethod = "İletişim yöntemi gerekli";
    if (!formValues.email.trim()) errors.email = "Email gerekli";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)
    ) {
      errors.email = "Geçersiz email";
    }

    if (!formValues.phone.trim()) errors.phone = "Telefon gerekli";
    else if (!/^\d+$/.test(formValues.phone)) {
      errors.phone = "Sadece rakam giriniz";
    }

    if (Object.keys(errors).length === 0) {
      onSubmit(formValues);
    } else {
      alert(Object.values(errors).join("\n"));
    }
  };

  const validateWithReact = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      onSubmit(formValues);
    } catch (err) {
      if (err.inner) {
        const errors = err.inner.map((e) => e.message);
        alert(errors.join("\n"));
      }
    }
  };

  const handleReset = () => {
    setFormValues({
      name: "",
      email: "",
      phone: "",
      message: "",
      department: "",
      newsletter: false,
      contactMethod: "email",
    });
  };

  return (
    <form className="contact-form">
      <div className="form-group form-item">
        <input
          type="text"
          placeholder="İsim"
          className="form-control"
          value={formValues.name}
          onChange={(e) =>
            setFormValues({ ...formValues, name: e.target.value })
          }
        />
      </div>
      <div className="form-group form-item">
        <input
          type="email"
          placeholder="Email"
          className="form-control"
          value={formValues.email}
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
        />
      </div>
      <div className="form-group form-item">
        <input
          type="tel"
          placeholder="Telefon"
          className="form-control"
          value={formValues.phone}
          onChange={(e) =>
            setFormValues({ ...formValues, phone: e.target.value })
          }
        />
      </div>
      <div className="form-group form-item">
        <textarea
          placeholder="Mesaj"
          value={formValues.message}
          className="form-control"
          onChange={(e) =>
            setFormValues({ ...formValues, message: e.target.value })
          }
        />
      </div>

      <div className="form-group form-item">
        <select
          className="form-control"
          value={formValues.department}
          onChange={(e) =>
            setFormValues({ ...formValues, department: e.target.value })
          }
        >
          <option value="">Departman Seçiniz</option>
          <option value="Satış">Satış</option>
          <option value="Destek">Destek</option>
          <option value="Teknik">Teknik</option>
        </select>
      </div>

      <div className="form-group form-item form-check">
        <input
          id="checbox"
          type="checkbox"
          className="form-check-input"
          checked={formValues.newsletter}
          onChange={(e) =>
            setFormValues({ ...formValues, newsletter: e.target.checked })
          }
        />
        <label class="form-check-label" for="checbox">
          Bültene abone ol
        </label>
      </div>

      <div className="form-group form-item">
        <div>İletişim Yöntemi:</div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            value="Email"
            id="emailRadio"
            name="contactMethod"
            className="form-check-input"
            checked={formValues.contactMethod === "Email"}
            onChange={(e) =>
              setFormValues({ ...formValues, contactMethod: e.target.value })
            }
          />
          <label className="form-check-label" for="emailRadio">
            Email
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            value="Telefon"
            name="contactMethod"
            className="form-check-input"
            id="phoneRadio"
            checked={formValues.contactMethod === "Telefon"}
            onChange={(e) =>
              setFormValues({ ...formValues, contactMethod: e.target.value })
            }
          />
          <label className="form-check-label" for="phoneRadio">
            Telefon
          </label>
        </div>
      </div>

      <div className="form-group buttons">
        <button
          type="button"
          className="btn btn-primary"
          onClick={validateWithJS}
        >
          JS ile Kontrol Et
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={validateWithReact}
        >
          React ile Kontrol Et
        </button>
        <button type="button" className="btn btn-primary" onClick={handleReset}>
          Temizle
        </button>
      </div>
    </form>
  );
}
