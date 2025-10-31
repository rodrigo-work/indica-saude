import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createPrinter, createSourceFile, ScriptTarget } from 'typescript'

// Caminho do arquivo TypeScript
const inputPath = process.argv[2]
if (!inputPath) {
  console.error('Uso: node remove-comments-safe.js <arquivo.ts>')
  process.exit(1)
}

const filePath = resolve(inputPath)
const sourceCode = readFileSync(filePath, 'utf8')

// Usa a API do TypeScript para parsear o código
const sourceFile = createSourceFile(
  filePath,
  sourceCode,
  ScriptTarget.Latest,
  /*setParentNodes*/ true
)

// Transforma o código, removendo comentários
const printer = createPrinter({ removeComments: true })
const cleanCode = printer.printFile(sourceFile)

// Salva o arquivo limpo
const outputPath = filePath.replace(/\.ts$/, '.clean.ts')
writeFileSync(outputPath, cleanCode, 'utf8')

console.log(`✅ Comentários removidos com segurança: ${outputPath}`)
