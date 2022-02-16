import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
const Token = () => {
  const router = useRouter();
  // パスパラメータから値を取得
  const { token } = router.query;
  return (
    <div>
      {token}
    </div>
  );
};

export default Token