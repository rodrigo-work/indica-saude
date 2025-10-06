import { Suggestion, Suggestions } from '@workspace/ui/components/ai-elements/suggestion'

export function SuggestionsBar({
  suggestions,
  onSuggestionClick
}: {
  suggestions: string[]
  onSuggestionClick: (suggestion: string) => void
}) {
  return (
    <Suggestions className="px-4">
      {suggestions.map((suggestion) => (
        <Suggestion
          key={suggestion}
          onClick={() => onSuggestionClick(suggestion)}
          size="sm"
          suggestion={suggestion}
        />
      ))}
    </Suggestions>
  )
}
