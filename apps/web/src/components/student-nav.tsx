import { useState } from "react"

import { AddStudentDialog } from "@/components/add-student-dialog"
import type { NewStudent } from "@/components/add-student-dialog"

type Student = NewStudent & { id: string }

const byName = new Intl.Collator(undefined, { sensitivity: "base" })

/** The sidebar's "Add Student" button and the tutor's students below it. */
export function StudentNav() {
  // TODO: load and save through the server once auth identifies the tutor
  const [students, setStudents] = useState<Array<Student>>([])

  function handleAdd(student: NewStudent) {
    setStudents((current) =>
      [...current, { ...student, id: crypto.randomUUID() }].sort((a, b) =>
        byName.compare(a.name, b.name)
      )
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <AddStudentDialog onAdd={handleAdd} />
      <div>
        <h2 className="px-2 py-1 text-xs font-medium text-muted-foreground">
          Students
        </h2>
        {students.length === 0 ? (
          <p className="px-2 py-1 text-xs text-muted-foreground">
            No students yet
          </p>
        ) : (
          <ul>
            {students.map((student) => (
              <li
                key={student.id}
                className="truncate rounded-md px-2 py-1.5 text-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                {student.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
