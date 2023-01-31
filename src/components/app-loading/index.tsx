import {createContext, useState} from "react"
import styles from './index.module.css'

export type AppLoadingContextDataType = {
  loadingState: boolean,
  setLoading: (state: boolean) => void
}

const initialData: AppLoadingContextDataType = {
  loadingState: false,
  setLoading: () => {
  }
}


export const AppLoadingContext = createContext<AppLoadingContextDataType>(initialData)


export default function AppLoading(props: any) {
  const [loadingState, setLoadingState] = useState<boolean>(false)

  const providerValue: AppLoadingContextDataType = {
    loadingState,
    setLoading: (state: boolean) => {
      console.log('>> setLoading fonksiyonu çağırıldı')
      console.log('>> setLoading params:', state)
      setLoadingState(state)
    }
  }

  return (
    <AppLoadingContext.Provider value={providerValue}>

      {/*burada hala istediğim jsx elemanlarını ekleyebilirim*/}

      {
        loadingState
          ? (
            <div className={styles.app_loading}>
              <img src={'/assets/images/loading.gif'}/>
            </div>
          )
          : (
            <></>
          )
      }

      {props.children}

    </AppLoadingContext.Provider>
  )
}

