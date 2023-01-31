import Breadcrumb from "../../components/breadcrumb"
import {Link} from "react-router-dom"
import {FormEvent, useContext} from "react"
import useApi from "../../hooks/useApi"
import {useDispatch} from "react-redux"
import {AppLoadingContext} from "../../components/app-loading"
import {AxiosResponse} from "axios"

export default function RegisterPage() {
  const appLoadingContextData = useContext(AppLoadingContext)

  const api = useApi()
  const dispatch = useDispatch()

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const formValues: any = Object.fromEntries(formData.entries())

    console.log('>> subscribedToNewsletter:', formValues.subscribedToNewsletter) // undefined

    formValues.subscribedToNewsletter = formValues.subscribedToNewsletter ? true : false

    console.log('>> FORM VAL', formValues)

    appLoadingContextData.setLoading(true)

    api.post('shop/customers', formValues)
      .then((response: AxiosResponse<any>) => {
        console.log('>> RESP', response)

      })
      .catch(() => {
        //alert('An error occured')
      })
      .finally(() => {
        setTimeout(() => document.location.href = '/auth/login', 55)

        appLoadingContextData.setLoading(false)
      })

  }


  return (
    <>
      <Breadcrumb items={[
        {title: 'Home', url: '/'},
        {title: 'Register'},
      ]}/>


      <div className="content">
        <div className="container">
          <div className="box">
            <div className="row">
              <div className="col-lg-offset-1 col-lg-5 col-md-offset-1 col-md-5 col-sm-12 col-xs-12 ">
                <div className="box-body">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-6 col-xs-12 mb20">
                      <h3 className="mb10">Login</h3>
                    </div>
                    <form onSubmit={onSubmit}>

                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                          <label className="control-label sr-only" htmlFor="email"></label>
                          <div className="login-input">
                            <input name="firstName" type="text" className="form-control"
                                   placeholder="Firstname" required/>
                            <div className="login-icon"><i className="fa fa-user"></i></div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                          <label className="control-label sr-only" htmlFor="email"></label>
                          <div className="login-input">
                            <input name="lastName" type="text" className="form-control"
                                   placeholder="Lastname" required/>
                            <div className="login-icon"><i className="fa fa-user"></i></div>
                          </div>
                        </div>
                      </div>


                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                          <label className="control-label sr-only" htmlFor="email"></label>
                          <div className="login-input">
                            <input name="email" type="text" className="form-control"
                                   placeholder="Enter your email" required/>
                            <div className="login-icon"><i className="fa fa-user"></i></div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                          <label className="control-label sr-only"></label>
                          <div className="login-input">
                            <input name="password" type="password" className="form-control" placeholder="Password"
                                   required/>
                            <div className="login-icon"><i className="fa fa-lock"></i></div>
                            <div className="eye-icon"><i className="fa fa-eye"></i></div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                          <label className="control-label sr-only"></label>
                          <div className="login-input">
                            <input name="subscribedToNewsletter" type="checkbox"/>
                            &nbsp;&nbsp;
                            Subscribe to newsletter?
                          </div>
                        </div>
                        <br/>
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb20 ">
                        <button type={"submit"} className="btn btn-primary btn-block mb10">
                          Register
                        </button>
                        <div>
                          <p>
                            Have an Acount?
                            &nbsp;
                            <Link to={'/auth/login'}>
                              Login
                            </Link>
                          </p>
                        </div>
                      </div>
                    </form>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                      <h4 className="mb20">Login With</h4>
                      <div className="social-media">
                        <a href="#" className="btn-social-rectangle btn-facebook"><i
                          className="fa fa-facebook"></i><span className="social-text">Facebook</span></a>
                        <a href="#" className="btn-social-rectangle btn-twitter"><i className="fa fa-twitter"></i><span
                          className="social-text">Twitter</span> </a>
                        <a href="#" className="btn-social-rectangle btn-googleplus"><i
                          className="fa fa-google-plus"></i><span className="social-text">Google Plus</span></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 ">
                <div className="box-body">
                  <div className="feature-left">
                    <div className="feature-icon">
                      <img src="https://ecommerce-template.udemig.dev/images/feature_icon_1.png" alt=""/>
                    </div>
                    <div className="feature-content">
                      <h4>Loyalty Points</h4>
                      <p>Aenean lacinia dictum risvitae pulvinar disamer seronorem ipusm dolor sit manert.</p>
                    </div>
                  </div>
                  <div className="feature-left">
                    <div className="feature-icon">
                      <img src="https://ecommerce-template.udemig.dev/images/feature_icon_2.png" alt=""/>
                    </div>
                    <div className="feature-content">
                      <h4>Instant Checkout</h4>
                      <p>Aenean lacinia dictum risvitae pulvinar disamer seronorem ipusm dolor sit manert.</p>
                    </div>
                  </div>
                  <div className="feature-left">
                    <div className="feature-icon">
                      <img src="https://ecommerce-template.udemig.dev/images/feature_icon_3.png" alt=""/>
                    </div>
                    <div className="feature-content">
                      <h4>Exculsive Offers</h4>
                      <p>Aenean lacinia dictum risvitae pulvinar disamer seronorem ipusm dolor sit manert.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

