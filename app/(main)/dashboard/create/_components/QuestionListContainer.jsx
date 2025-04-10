import React from 'react'
import QuestionList from './QuestionList'

function QuestionListContainer({questionList}) {
  return (
    <div>
        <h2 className="text-lg font-bold">Questions List</h2>
        <div className="border-t border-primary/20 p-5">
          {questionList.map((item, index) => (
            <div
              key={index}
              className="p-5 bg-muted rounded-lg border border-primary/20 shadow-sm items-center gap-5 mt-8"
            >
              <h2 className="font-medium">{item.question}</h2>
              <h2 className="mt-2 text-muted-foreground">Type: {item?.type}</h2>
              {/* <p className="text-muted-foreground">{item.answer}</p> */}
            </div>
          ))}
        </div>
    </div>
  )
}

export default QuestionListContainer