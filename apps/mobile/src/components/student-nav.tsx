import { useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { randomUUID } from "expo-crypto"

import { AddStudentSheet } from "@/components/add-student-sheet"
import type { NewStudent } from "@/components/add-student-sheet"
import { Text } from "@/components/ui/text"
import { RADIUS } from "@/lib/colors"
import { useColors } from "@/lib/theme"

type Student = NewStudent & { id: string }

const byName = new Intl.Collator(undefined, { sensitivity: "base" })

/** The nav's "Add Student" button and the tutor's students below it. */
export function StudentNav() {
  const colors = useColors()
  // TODO: load and save through the server once auth identifies the tutor
  const [students, setStudents] = useState<Array<Student>>([])

  function handleAdd(student: NewStudent) {
    setStudents((current) =>
      [...current, { ...student, id: randomUUID() }].sort((a, b) =>
        byName.compare(a.name, b.name)
      )
    )
  }

  return (
    <View style={styles.nav}>
      <AddStudentSheet onAdd={handleAdd} />
      <View>
        <Text
          accessibilityRole="header"
          muted
          weight="medium"
          style={styles.heading}
        >
          Students
        </Text>
        {students.length === 0 ? (
          <Text muted style={styles.item}>
            No students yet
          </Text>
        ) : (
          students.map((student) => (
            <Pressable
              key={student.id}
              style={({ pressed }) => [
                styles.row,
                pressed && { backgroundColor: colors.sidebarAccent },
              ]}
            >
              <Text numberOfLines={1} style={styles.item}>
                {student.name}
              </Text>
            </Pressable>
          ))
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  nav: { gap: 8 },
  heading: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    lineHeight: 16,
  },
  row: { borderRadius: RADIUS.md },
  item: { paddingHorizontal: 8, paddingVertical: 8 },
})
