"use client"

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { validationRules } from '@/utils/validationRules'
import { getYears } from '@/helpers/getYears'
import { DEFAULT, NAVIGATION } from '@/constant/config'

import Container from "@/components/Container"
import Button from '@/components/Button'
import Field from '@/components/Field'
import Password from '@/components/Password'
import Textarea from '@/components/Textarea'
import Select from '@/components/Select'
import Checkbox from '@/components/Checkbox'
import Label from '@/components/Label'

import InputGroup from '@/modules/InputGroup'
import FiltersMultiSelect from '@/modules/FiltersMultiSelect'

import style from './index.module.scss'

const TABS = [
  'Buttons & references',
  'Fields & input',
  'Variables & colors',
  'Typography'
]

const SectionUI = () => {
  const t = useTranslations()
  const search = useSelector((state) => state.search)
  const filters = useSelector((state) => state.filters)
  const [active, setActive] = useState(1)
  const [text, setText] = useState('')
  const [checkbox, setCheckbox] = useState('0')

  const [filter, setFilter] = useState({
    username: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    },
    years: {
      value: '',
      isValid: false
    }
  })

  const handleChange = (field, { value, isValid }) => {
    setFilter((prevData) => ({
      ...prevData,
      [field]: { value, isValid },
    }))
  }

  return (
    <section className={style.section}>
      <Container classes={style.container}>
        <h1>UI Kit</h1>
        <br />
        <div className={style.grid}>
          <div className={style.column}>
            <menu>
              {
                TABS.map((el, idx) =>
                  <Button
                    key={idx}
                    placeholder={el}
                    classes={[active === idx ? 'primary' : 'alt', 'wide', 'left']}
                    onChange={() => setActive(idx)}
                  />
                )
              }
            </menu>
          </div>
          <div className={style.column}>
            {
              active === 0 &&
              <table>
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Palette</th>
                    <th>Normal</th>
                    <th>Loading</th>
                    <th>Disabled</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan={6}>
                      <code>classes=['lg']</code>
                    </td>
                    <td>
                      <code>classes=['primary']</code>
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        icon={'xmark'}
                        classes={['primary', 'lg']}
                      />
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        icon={'xmark'}
                        classes={['primary', 'lg']}
                        isLoading={true}
                      />
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        icon={'xmark'}
                        classes={['primary', 'lg']}
                        isDisabled={true}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>classes=['primary']</code>
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        classes={['primary', 'lg']}
                      />
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        classes={['primary', 'lg']}
                        isLoading={true}
                      />
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        classes={['primary', 'lg']}
                        isDisabled={true}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>classes=['primary']</code>
                    </td>
                    <td>
                      <Button
                        icon={'xmark'}
                        classes={['primary', 'lg']}
                      />
                    </td>
                    <td>
                      <Button
                        icon={'xmark'}
                        classes={['primary', 'lg']}
                        isLoading={true}
                      />
                    </td>
                    <td>
                      <Button
                        icon={'xmark'}
                        classes={['primary', 'lg']}
                        isDisabled={true}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>classes=['secondary']</code>
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        icon={'xmark'}
                        classes={['secondary', 'lg']}
                      />
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        icon={'xmark'}
                        classes={['secondary', 'lg']}
                        isLoading={true}
                      />
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        icon={'xmark'}
                        classes={['secondary', 'lg']}
                        isDisabled={true}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>classes=['alt']</code>
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        icon={'xmark'}
                        classes={['alt', 'lg']}
                      />
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        icon={'xmark'}
                        classes={['alt', 'lg']}
                        isLoading={true}
                      />
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        icon={'xmark'}
                        classes={['alt', 'lg']}
                        isDisabled={true}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>classes=['reference']</code>
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        icon={'xmark'}
                        classes={['reference', 'lg']}
                      />
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        icon={'xmark'}
                        classes={['reference', 'lg']}
                        isLoading={true}
                      />
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        icon={'xmark'}
                        classes={['reference', 'lg']}
                        isDisabled={true}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>classes=['lg', 'square']</code>
                    </td>
                    <td>
                      <code>classes=['primary']</code>
                    </td>
                    <td>
                      <Button
                        icon={'xmark'}
                        classes={['primary', 'lg', 'square']}
                      />
                    </td>
                    <td>
                      <Button
                        icon={'xmark'}
                        classes={['primary', 'lg', 'square']}
                        isLoading={true}
                      />
                    </td>
                    <td>
                      <Button
                        icon={'xmark'}
                        classes={['primary', 'lg', 'square']}
                        isDisabled={true}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>classes=['md']</code>
                    </td>
                    <td>
                      <code>classes=['primary']</code>
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        icon={'xmark'}
                        classes={['primary', 'md']}
                      />
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        icon={'xmark'}
                        classes={['primary', 'md']}
                        isLoading={true}
                      />
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        icon={'xmark'}
                        classes={['primary', 'md']}
                        isDisabled={true}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>classes=['sm']</code>
                    </td>
                    <td>
                      <code>classes=['primary']</code>
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        icon={'xmark'}
                        classes={['primary', 'sm']}
                      />
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        icon={'xmark'}
                        classes={['primary', 'sm']}
                        isLoading={true}
                      />
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        icon={'xmark'}
                        classes={['primary', 'sm']}
                        isDisabled={true}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>classes=['xs']</code>
                    </td>
                    <td>
                      <code>classes=['primary']</code>
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        icon={'xmark'}
                        classes={['primary', 'xs']}
                      />
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        icon={'xmark'}
                        classes={['primary', 'xs']}
                        isLoading={true}
                      />
                    </td>
                    <td>
                      <Button
                        placeholder={'Close'}
                        icon={'xmark'}
                        classes={['primary', 'xs']}
                        isDisabled={true}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            }

            {
              active === 1 &&
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Normal</th>
                    <th>Disabled</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan={2}>
                      <code>type='text'</code>
                      <br/>
                      <code>type='date'</code>
                    </td>
                    <td>
                      <Field
                        type={'text'}
                        placeholder={'Placeholder'}
                        data={text}
                        onChange={(value) => setText(value)}
                        isClear={true}
                      />
                    </td>
                    <td>
                      <Field
                        type={'text'}
                        placeholder={'Placeholder'}
                        data={text}
                        onChange={(value) => setText(value)}
                        isDisabled={true}
                        isClear={true}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Field
                        type={'date'}
                        placeholder={'Placeholder'}
                        data={text}
                        onChange={(value) => setText(value)}
                      />
                    </td>
                    <td>
                      <Field
                        type={'date'}
                        placeholder={'Placeholder'}
                        data={text}
                        onChange={(value) => setText(value)}
                        isDisabled={true}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>Password</code>
                    </td>
                    <td>
                      <Password
                        placeholder={'Placeholder'}
                        data={text}
                        onChange={(value) => setText(value)}
                      />
                    </td>
                    <td>
                      <Password
                        placeholder={'Placeholder'}
                        data={text}
                        onChange={(value) => setText(value)}
                        isDisabled={true}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>Select</code>
                    </td>
                    <td>
                      <Select
                        id={'select_year'}
                        options={
                          getYears().map(year => ({
                            value: year === DEFAULT ? DEFAULT : year,
                            label: year === DEFAULT ? 'Years' : year,
                          }))
                        }
                        data={filter.years?.value || DEFAULT}
                        onChange={(value) =>
                          handleChange('years', { value: value, isValid: false })
                        }
                      />
                    </td>
                    <td>
                      <Select
                        id={'select_year'}
                        options={
                          getYears().map(year => ({
                            value: year === DEFAULT ? DEFAULT : year,
                            label: year === DEFAULT ? 'Years' : year,
                          }))
                        }
                        data={filter.years?.value || DEFAULT}
                        onChange={(value) =>
                          handleChange('years', { value: value, isValid: false })
                        }
                        isDisabled={true}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>MultiSelect</code>
                    </td>
                    <td>
                      <FiltersMultiSelect
                        placeholder={'category'}
                        options={filters.category.options}
                        data={search.category}
                      />
                    </td>
                    <td>
                      <FiltersMultiSelect
                        placeholder={'category'}
                        options={filters.category.options}
                        data={search.category}
                        isDisabled={true}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>Textarea</code>
                    </td>
                    <td>
                      <Textarea
                        placeholder={'Placeholder'}
                        data={text}
                        onChange={(value) => setText(value)}
                      />
                    </td>
                    <td>
                      <Textarea
                        placeholder={'Placeholder'}
                        data={text}
                        onChange={(value) => setText(value)}
                        isDisabled={true}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>InputGroup</code>
                    </td>
                    <td>
                      <InputGroup
                        label={'Placeholder'}
                        value={filter.username.value}
                        rules={[
                          validationRules.required,
                          validationRules.minLength(5),
                        ]}
                        onValidationChange={(isValid) =>
                          handleChange('username', { value: filter.username.value, isValid })
                        }
                      >
                        <Field
                          placeholder={'Placeholder'}
                          data={filter.username.value}
                          onChange={(value) => handleChange('username', { value, isValid: filter.username.isValid })}
                        />
                      </InputGroup>
                    </td>
                    <td>
                      <InputGroup
                        label={t('password')}
                        value={filter.password.value}
                        rules={[
                          validationRules.required,
                          validationRules.minLength(5),
                        ]}
                        onValidationChange={(isValid) =>
                          handleChange('password', { value: filter.password.value, isValid })
                        }
                      >
                        <Password
                          placeholder={t('password')}
                          data={filter.password.value}
                          onChange={(value) => handleChange('password', { value, isValid: filter.password.isValid })}
                        />
                      </InputGroup>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>Label</code>
                    </td>
                    <td>
                      <Label
                        data={'Years'}
                        isRequired={true}
                      />
                    </td>
                    <td>
                      <Label
                        data={'Years'}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={2}>
                      <code>Checkbox</code>
                    </td>
                    <td>
                      <Checkbox
                        placeholder={'Checkbox'}
                        data={checkbox}
                        onChange={(el) => setCheckbox(el)}
                      />
                    </td>
                    <td>
                      <Checkbox
                        placeholder={'Checkbox'}
                        data={checkbox}
                        onChange={(el) => setCheckbox(el)}
                        isDisabled={true}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Checkbox
                        data={checkbox}
                        onChange={(el) => setCheckbox(el)}
                      />
                    </td>
                    <td>
                      <Checkbox
                        data={checkbox}
                        onChange={(el) => setCheckbox(el)}
                        isDisabled={true}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            }

            {
              active === 2 &&
              <table>
                <thead>
                  <tr>
                    <th>Variables</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>
                        <strong>Color:</strong><br/>
                        --color-white: #fff;<br/>
                        --color-black: #000;<br/>
                        --color-grey-50: #f5f7fb;<br/>
                        --color-grey-100: #edf1f8;<br/>
                        --color-grey-200: #d7e1ef;<br/>
                        --color-grey-300: #b3c3de;<br/>
                        --color-grey-400: #8e9fc3;<br/>
                        --color-grey-500: #63749b;<br/>
                        --color-grey-600: #485885;<br/>
                        --color-grey-700: #31406f;<br/>
                        --color-grey-800: #1f2b59;<br/>
                        --color-grey-900: #131c4a;<br/>
                        --color-text: var(--color-grey-700);<br/>
                        --color-primary: #3e47dd;<br/>
                        --color-primary-hover: #3e27c4;<br/>
                        --color-secondary: #d8dbfd;<br/>
                        --color-secondary-hover: #b3b8fb;<br/>
                        --color-warning: #e74c3c;<br/>
                        --color-success: #07bc0c;<br/>
                        --color-info: #3498db;<br/>
                        --color-orange: #ff9d32;<br/>
                        --color-gold: #ff7300;<br/>
                        --color-red: #b51632;<br/>
                        --color-background: #edf1f8;<br/>

                        <br/>
                        <strong>Box shadow:</strong><br/>
                        --box-shadow-4-8: 0 4px 8px rgba(72, 88, 133, 0.08);<br/>
                        --box-shadow-4-16:  0 4px 16px 0 rgba(72, 88, 133, 0.12);<br/>
                        --box-shadow-16-24: 0 16px 24px -20px rgba(62, 71, 221, 1);<br/>
                        --box-shadow-16-36: 0 16px 36px -18px rgb(163, 157, 195);<br/>

                        <br/>
                        <strong>Gradient & mask:</strong><br/>
                        --gradient-gold: linear-gradient(313.87deg, #ff7300 24.5%, #ff9800 76.4%);<br/>
                        --gradient-blue: linear-gradient(111.72deg, #3e47dd 14.24%, #262a98 85.8%);<br/>
                        --mask-left: polygon(0 0, 100% 0, 100% 95%, 0 100%);<br/>
                        --mask-right: polygon(0 0, 100% 0, 100% 100%, 0 95%);<br/>

                        <br/>
                        <strong>Gap:</strong><br/>
                        --gap-2: 2px;<br/>
                        --gap-4: 4px;<br/>
                        --gap-6: 6px;<br/>
                        --gap-8: 8px;<br/>
                        --gap-10: 10px;<br/>
                        --gap-12: 12px;<br/>
                        --gap-16: 16px;<br/>
                        --gap-18: 18px;<br/>
                        --gap-20: 20px;<br/>
                        --gap-24: 24px;<br/>
                        --gap-32: 32px;<br/>
                        --gap-40: 40px;<br/>
                        --gap-48: 48px;<br/>
                        --gap-52: 52px;<br/>
                        --gap-56: 56px;<br/>
                        --gap-64: 64px;<br/>
                        --gap-80: 80px;<br/>

                        <br/>
                        <strong>Border radius:</strong><br/>
                        --border-radius-2: 2px;<br/>
                        --border-radius-4: 4px;<br/>
                        --border-radius-8: 8px;<br/>

                        <br/>
                        <strong>Typography:</strong><br/>
                        --font-size: 16px;<br/>
                        --font-family: 'Poppins', sans-serif;<br/>
                        --line-height: 1.5;<br/>
                        --typography-regular: 400;<br/>
                        --typography-medium: 500;<br/>
                        --typography-bold: 700;
                      </code>
                    </td>
                  </tr>
                </tbody>
              </table>
            }

            {
              active === 3 &&
              <table>
                <thead>
                  <tr>
                    <th>Typography</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>
                        <p>CarAudit is an important part of this service</p>
                        <h1>h1 Text</h1>
                        <h2>h2 Text</h2>
                        <h3>h3 Text</h3>
                        <h4>h4 Text</h4>
                        <h5>h5 Text</h5>
                        <h6>h6 Text</h6>
                      </code>
                    </td>
                  </tr>
                </tbody>
              </table>
            }
          </div>
        </div>
      </Container>
    </section>
  )
}

export default SectionUI