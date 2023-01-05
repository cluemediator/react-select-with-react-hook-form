import React, { useState } from 'react';
import { useForm, useController } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Select from 'react-select';

const schema = yup.object({
  name: yup.string().required("Please enter name"),
  email: yup.string().email("Please enter valid email").required("Please enter email"),
  website: yup.string().url("Please enter valid url").required("Please enter url"),
  language: yup.number().nullable().required("Please select language"),
});

const languageList = [
  { value: 1, label: 'English' },
  { value: 2, label: 'Hindi' }
];

function App() {
  const [data, setData] = useState();
  const { register, handleSubmit, formState, control } = useForm({
    resolver: yupResolver(schema)
  });

  const { field } = useController({ name: 'language', control });
  const { value: langValue, onChange: langOnChange, ...restLangField } = field;

  // const { field: { value: langValue, onChange: langOnChange, ...restLangField } } = useController({ name: 'language', control });

  const { errors } = formState;

  const onSubmit = (formData) => {
    setData({ ...formData });
  }

  return <form onSubmit={handleSubmit(onSubmit)}>
    <h4>Add a react-select dropdown with react-hook-form - <a href="https://www.cluemediator.com/" target="_blank" rel="noopener noreferrer">Clue Mediator</a></h4>
    <div>
      <label>Name</label>
      <input
        placeholder='Name'
        {...register('name')}
      />
      {errors.name && <p>{errors.name.message}</p>}
    </div>
    <div>
      <label>Email</label>
      <input
        placeholder='Email'
        {...register('email')}
      />
      {errors.email && <p>{errors.email.message}</p>}
    </div>
    <div>
      <label>Website</label>
      <input
        placeholder='Website'
        {...register('website')}
      />
      {errors.website && <p>{errors.website.message}</p>}
    </div>
    <div>
      <label>Language</label>
      <Select
        className='select-input'
        placeholder="Select Language"
        isClearable
        options={languageList}
        value={langValue ? languageList.find(x => x.value === langValue) : langValue}
        onChange={option => langOnChange(option ? option.value : option)}
        {...restLangField}
      />
      {errors.language && <p>{errors.language.message}</p>}
    </div>
    <div>
      <button>Submit</button>
    </div>
    {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
  </form>
}

export default App;