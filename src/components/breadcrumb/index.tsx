import {Link} from "react-router-dom"

export type BreadcrumbItemType = {
  title: string,
  url?: string
}


export type BreadcrumbPropsType = {
  items: BreadcrumbItemType[]
}


export default function Breadcrumb(props: BreadcrumbPropsType) {
  return (
    <div className="page-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="page-breadcrumb">
              <ol className="breadcrumb">
                {
                  props.items.map((item: BreadcrumbItemType, index: number) => {
                    if (index < (props.items.length - 1)) {
                      return <li key={index}>
                        <Link to={item.url as string}>
                          {item.title}
                        </Link>
                      </li>
                    } else {
                      return <li key={index}>
                        {item.title}
                      </li>
                    }
                  })
                }
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
