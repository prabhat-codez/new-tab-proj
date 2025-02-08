import { Icon } from "@iconify/react/dist/iconify.js"
import clsx from "clsx"
import Button from "~/components/ui/button"
import type { Query } from "~/types"
import { checkUrlPrefix } from "~/utils"

interface SuggestionItemProps {
  qry: Query
  remove: () => void
  filterString: string
  selectedEngine: string
}

export default function SuggestionItem({
  qry,
  filterString,
  remove,
  selectedEngine,
}: SuggestionItemProps) {
  const { query, isIcon } = qry

  const textClassName = (chars: string, currWord: string, charIdx: number) => {
    let style = ""

    if (chars === filterString) {
      style = "rounded-md bg-foreground/30"
      if (chars === currWord) style = `${style} px-2`
      if (charIdx === 0) style = `${style} pl-2`
    }

    return style
  }

  return (
    <a
      target="_self"
      href={checkUrlPrefix(query) ? query : selectedEngine + query}
      className={clsx(
        "group inline-flex w-full items-center gap-2 rounded-lg p-2 text-start hover:bg-foreground/30 focus:border-none focus:bg-backgroundAlt focus:outline-none",
      )}
    >
      <span className="flex items-center rounded-md p-1.5 group-hover:bg-backgroundAlt">
        {isIcon ? (
          <img
            src={`https://www.google.com/s2/favicons?domain=${query}&sz=20`}
            alt="id"
          />
        ) : (
          <Icon icon="material-symbols:search-rounded" fontSize={20} />
        )}
      </span>
      {query.split(/\s+/).map((word, index) => (
        <span key={word + index.toString()}>
          {word
            // Split input string into chunks based on the length of the
            // user's query for better matching.
            .match(new RegExp(`.{1,${filterString?.length}}`, "g"))
            ?.map((chars, index) => (
              <span
                key={chars + index.toString()}
                className={textClassName(chars, word, index)}
              >
                {chars}
              </span>
            ))}
        </span>
      ))}
      <Button
        tabIndex={-1}
        className="ml-auto hidden size-6 hover:bg-destructive group-hover:flex group-focus:flex"
        size="icon"
        onClick={(e) => {
          e.preventDefault()
          remove()
        }}
      >
        <Icon icon="lucide:x" />
      </Button>
    </a>
  )
}
