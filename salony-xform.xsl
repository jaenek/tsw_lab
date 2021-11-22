<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="xml" indent="yes" />

  <xsl:template match="dealerships">
    <salony>
      <xsl:for-each select="dealership">
        <salon>
          <nazwa>
            <xsl:value-of select="name" />
          </nazwa>
          <lokacja>
            <xsl:value-of select="location" />
          </lokacja>
        </salon>
      </xsl:for-each>
    </salony>
  </xsl:template>
</xsl:stylesheet>