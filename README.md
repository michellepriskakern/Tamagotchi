Idee:
Zu Beginn möchte ich erklären, wie die Idee entstanden ist. Ursprünglich wollte ich ein klassisches Tamagotchi entwickeln, doch das schien mir zu langweilig. Also kam mir der Gedanke, zwei Tiere miteinander zu kombinieren und ein völlig neues, fantasievolles Wesen zu erschaffen. Der Reiz dabei liegt nicht nur in der einzigartigen Entstehung dieser Hybriden, sondern auch in der Pflege: Je nachdem, wie gut man sich um das Hybridwesen kümmert, beeinflusst das seine Entwicklung – entweder positiv oder negativ. Dadurch entsteht ein interaktives und unterhaltsames Spielerlebnis.

Logik:
Das Spiel folgt einer klaren Logik, die sich um die Pflege des Hybriden dreht und dessen Entwicklung beeinflusst. Die drei zentralen Attribute – Liebe, Hunger und Pflege – verändern sich alle alle 20 Sekunden:

Liebe nimmt um 15 % ab
Hunger nimmt um 10 % ab
Pflege nimmt um 5 % ab

Level-Up-Mechanik
Alle 2 Minuten erreicht der Hybrid ein neues Level. Um das schneller zu veranschaulichen, gibt es einen Level-Up-Button. Beim Level-Up verändert sich das Wesen optisch und wird größer. Die Entwicklung hängt davon ab, wie gut es gepflegt wurde:

Sind alle Werte (Liebe, Hunger, Pflege) über 50 %, entwickelt sich der Hybrid positiv.
Sind einer oder mehrere Werte unter 50 %, entwickelt es sich negativ.

Mit jedem Level-Up altert der Hybrid:
Neugeborenes (Newborn Baby)
Junges Kind (Young Child)
Jugendlicher (Adolescent)

Spezifische Veränderungen durch Vernachlässigung oder Überversorgung
Bestimmte Zustände haben besondere Auswirkungen auf das Verhalten und Aussehen des Hybriden:
Liebe > 50 % für 20 Sekunden: Das Hybrid wird böse, bekommt Schaum vor den Mund und seine Augen werden grün.
Liebe < 50 %: Es behält seine freundlichen, großen Augen.
Hunger > 50 % für 20 Sekunden: Der Hybrid wird sehr dünn.
Hunger < 50 %: Es wird pummelig und gut genährt.
Pflege > 50 % für 20 Sekunden: Der Hybrid beginnt zu stinken und wird krank.
Pflege < 50 %: Es bleibt sauber und glücklich.

Diese Mechanik sorgt dafür, dass der Spieler aktiv auf die Bedürfnisse des Hybriden achten muss, um dessen Entwicklung in die gewünschte Richtung zu lenken.

Methode:
Bevor ich meine Idee in die Programmeirung umgesetzt habe, habe ich in Figma Wireframes visualisiert und in Miro habe ich eine kleine Informationsarchitektur erstellt um einen Überblick zu bekommen, welche Funktionen und Unetrseiten ich brauche. 

Das Spiel beginnt auf der Homepage, von wo aus der Spieler entweder direkt starten oder über die Navigationsleiste zu verschiedenen Bereichen wechseln kann. Bevor das Spiel beginnt, ist es sinnvoll, die Spielanleitung zu lesen, um die Mechaniken besser zu verstehen. Anschließend bietet das Lexikon einen Überblick über mögliche Kreuzungen und detaillierte Informationen zu den einzelnen Tieren, die durch das Anklicken der jeweiligen Karte angezeigt werden. Diese Informationen werden dynamisch generiert.

Funktionsweise:
Der eigentliche Spielprozess startet mit der Elternwahl im Bereich „Parentselection“, wo der Spieler zwei Elterntiere auswählt. Nach der Auswahl erscheint ein „Generieren“-Button, mit dem ein Hybrid aus den beiden Tieren erschaffen wird. Um sich um den neu generierten Hybrid zu kümmern, kann der Spieler den Menüpunkt „Deine Hybriden“ aufrufen. Dort werden alle bereits erschaffenen Hybriden gesammelt und angezeigt. Wählt der Spieler einen Hybrid aus, kann er sich aktiv um dessen Pflege kümmern. Die Entwicklung des Hybriden hängt von der Qualität der Pflege ab – wird er gut versorgt, entwickelt er sich positiv, bei Vernachlässigung hingegen kann sich seine Entwicklung negativ auswirken. Jeder Hybrid durchläuft drei Altersstufen – Baby, Jugendlich und Erwachsen – wobei sich je nach Pflege spannende und unerwartete Entwicklungen ergeben können.


Herausfroderungen:
-In meinem Projekt bin ich auf verschiedene technische Herausforderungen gestoßen, die vor allem bei der Bildgenerierung und der Logik des Spiels auftraten. Ein zentrales Problem war die Anzeige der mythischen Namen, die mehrmals generiert wurden, aber nicht korrekt angezeigt wurden. Dies war zu Beginn eine größere Hürde, doch ich entschied mich, mich vorerst auf die funktionale Gestaltung des Spiels zu konzentrieren.
-Die größte Herausforderung bestand jedoch in der Generierung der passenden Bilder. Dabei trat das Problem auf, dass die visuelle Veränderung des Hybriden oft zufällig geschah und sich nicht gezielt an den Statuswerten orientierte. Es war unklar, ob die Elternteile korrekt in den Generierungsprozess einbezogen wurden und ob die Werte des Prompts die relevanten Statuswerte, insbesondere jene über oder unter 50%, korrekt berücksichtigten.
-Zudem gab es mehrfach Probleme mit der Logik, die ich während des Entwicklungsprozesses ändern musste, weil sie entweder keinen Sinn ergab oder zu komplex für mich war, um sie sinnvoll umzusetzen. In meiner Präsentation werde ich daher auch erläutern, wie das System idealerweise funktionieren sollte und welche technischen Herausforderungen dabei auftraten.
-Promts die ich benutzt habe:

Fazit:
Abschließend muss ich sagen, dass ich mir mein Thema zu Beginn deutlich einfacher vorgestellt hatte. Rückblickend würde ich, falls ich noch einmal von vorne beginnen könnte, wahrscheinlich die Bildgenerierung ganz weglassen und stattdessen auf Textgenerierung setzen. Das würde mir ermöglichen, ein komplett anderes Spiel zu entwickeln, das weniger komplex in der visuellen Umsetzung ist. Trotz der Herausforderungen habe ich jedoch viel aus diesem Kurs mitgenommen. Auch wenn mir das Programmieren nach wie vor schwerfällt, war der Unterricht sehr hilfreich und hat mir Spaß gemacht – vor allem, weil der Austausch und die Unterstützung im Kurs motivierender waren als das Programmieren alleine.